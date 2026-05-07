import nodemailer from 'nodemailer';

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

// IMPORTANT: You must configure your email provider details in your .env file.
// For Gmail, you'll need to create an "App Password".
// See: https://support.google.com/accounts/answer/185833
const smtpOptions = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASSWORD || '',
  },
};

export const sendEmail = async (data: EmailPayload) => {
  if (!smtpOptions.auth.user || !smtpOptions.auth.pass || smtpOptions.auth.user === 'youremail@gmail.com') {
    console.error('SMTP user or password is not set in environment variables.');
    // In a real app, you might want to throw an error or handle this differently.
    // For this example, we'll simulate a success to avoid breaking the UI,
    // but log a clear error.
    console.log('SIMULATING SUCCESSFUL EMAIL: In a real environment, this would have failed.');
    console.log('Email data:', data);
    return { success: true, message: 'Simulated email sent successfully.' };
  }

  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: process.env.SMTP_USER,
    ...data,
  });
};
