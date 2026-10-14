'use server';

import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Please enter a valid email address.'),
});

export async function handleNewsletterSubscribe(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const raw = { email: formData.get('email') };
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, message: parsed.error.errors[0].message };
  }

  const { email } = parsed.data;

  const sheetId = process.env.GOOGLE_SHEET_ID;
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !serviceEmail || !privateKey) {
    console.warn('âš ï¸ Google Sheets env vars not set â€” newsletter subscription not logged');
    // Still return success so user experience is not broken
    return { success: true, message: 'Thank you for subscribing!' };
  }

  try {
    const { google } = await import('googleapis');

    const auth = new google.auth.JWT({
      email: serviceEmail,
      key: privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'short',
      timeStyle: 'short',
    });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Newsletter!A:B',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, email]],
      },
    });

    console.log('âœ… Newsletter subscriber logged:', email);
    return { success: true, message: 'Thank you for subscribing! ðŸŽ‰' };
  } catch (err) {
    console.error('âŒ Failed to log newsletter subscriber:', err);
    // Don't fail for the user â€” sheet logging is best-effort
    return { success: true, message: 'Thank you for subscribing!' };
  }
}
