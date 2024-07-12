import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  const response = await resend.emails.send({
    from: 'mail@quencodell.pl',
    to: email,
    subject: 'Verify your email',
    // react: EmailTemplate({ firstName: confirmLink }),
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email</p>`,
  });

  return response;
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/new-password?token=${token}`;

  const response = await resend.emails.send({
    from: 'mail@quencodell.pl',
    to: email,
    subject: 'Reset your password',
    // react: EmailTemplate({ firstName: confirmLink }),
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });

  return response;
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const response = await resend.emails.send({
    from: 'mail@quencodell.pl',
    to: email,
    subject: '2FA code',
    // react: EmailTemplate({ firstName: confirmLink }),
    html: `<p>Your 2FA code: ${token}</p>`,
  });

  return response;
};
