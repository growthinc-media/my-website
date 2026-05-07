
'use server';

import { z } from 'zod';
import { sendEmail } from '@/services/send-email';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  service: z.string(),
  message: z.string(),
});

export async function handleContactForm(
  input: z.infer<typeof formSchema>
): Promise<{ success: boolean; message: string }> {
  const validatedInput = formSchema.safeParse(input);

  if (!validatedInput.success) {
    return { success: false, message: 'Invalid input.' };
  }
  
  const { name, email, service, message } = validatedInput.data;

  try {
    await sendEmail({
      to: 'contact@growthincs.in',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <p>You have a new contact form submission:</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Service of Interest:</strong> ${service}</li>
          <li><strong>Message:</strong></li>
        </ul>
        <p>${message}</p>
      `,
    });
    return { success: true, message: 'Email sent successfully.' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Failed to send message.' };
  }
}
