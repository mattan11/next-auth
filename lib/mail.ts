import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/new-verifiaction?token=${token}`;

  const response = await resend.emails.send({
    from: 'verify@compoany.com',
    to: email,
    subject: 'Verify your email',
    // react: EmailTemplate({ firstName: confirmLink }),
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
  });

  console.log(response, 'response');

  return response;
};
