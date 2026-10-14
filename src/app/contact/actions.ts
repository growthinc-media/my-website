'use server';

import { z } from 'zod';
import { sendEmail } from '@/services/send-email';

const formSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactFormInput = z.infer<typeof formSchema>;

async function appendToGoogleSheet(data: ContactFormInput) {
  try {
    const { google } = await import('googleapis');

    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'short',
      timeStyle: 'short',
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          timestamp,
          data.name,
          data.email,
          data.phone || '',
          data.service,
          data.budget || '',
          data.message,
        ]],
      },
    });

    console.log('✅ Contact form data saved to Google Sheet');
  } catch (error) {
    // Non-blocking: log but don't fail the whole submission
    console.error('⚠️ Failed to append to Google Sheet (non-blocking):', error);
  }
}

export async function handleContactForm(
  input: ContactFormInput
): Promise<{ success: boolean; message: string }> {
  const validatedInput = formSchema.safeParse(input);

  if (!validatedInput.success) {
    return { success: false, message: 'Invalid input. Please check all fields.' };
  }

  const { name, email, phone, service, budget, message } = validatedInput.data;

  try {
    // 1. Send email notification
    await sendEmail({
      to: 'contact@growthincs.in',
      subject: `🚀 New Enquiry from ${name} — ${service}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 8px;">
          <h2 style="color: #1e40af; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #6b7280; margin-top: 0;">From the Growthincs website contact form</p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600; width: 140px;">Name</td><td style="padding: 8px 0; color: #111827;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Email</td><td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #1e40af;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Phone</td><td style="padding: 8px 0; color: #111827;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Service</td><td style="padding: 8px 0; color: #111827;">${service}</td></tr>
            ${budget ? `<tr><td style="padding: 8px 0; color: #374151; font-weight: 600;">Budget</td><td style="padding: 8px 0; color: #111827;">${budget}</td></tr>` : ''}
            <tr><td style="padding: 8px 0; color: #374151; font-weight: 600; vertical-align: top;">Message</td><td style="padding: 8px 0; color: #111827;">${message}</td></tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
          <p style="color: #9ca3af; font-size: 12px;">Sent from growthincs.org contact form</p>
        </div>
      `,
    });

    // 2. Append to Google Sheet (non-blocking — runs after email)
    await appendToGoogleSheet(validatedInput.data);

    return {
      success: true,
      message: "Thanks for reaching out! We'll get back to you within 24 hours.",
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: 'Something went wrong. Please email us directly at contact@growthincs.in',
    };
  }
}
