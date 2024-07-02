import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verification?token=${token}`;
  console.log(email, 'email');

  const response = await resend.emails.send({
    from: 'delivered@resend.dev',
    to: 'marek.witkowski@intersynergy.pl',
    subject: 'Verify your email',
    // react: EmailTemplate({ firstName: confirmLink }),
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
  });

  return response;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/new-password?token=${token}`;
  console.log(email, 'email');

  const response = await resend.emails.send({
    from: 'delivered@resend.dev',
    to: 'marek.witkowski@intersynergy.pl',
    subject: 'Reset your password',
    // react: EmailTemplate({ firstName: confirmLink }),
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });

  return response;
};
