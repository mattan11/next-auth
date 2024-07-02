'use server';

import { getUserByEmail } from '@/data/user';
import * as z from 'zod';
import { ResetSchema } from '@/schemas';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.parse(values);

  if (!validatedFields) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields;

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: 'Email does not exist!' };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  if (!passwordResetToken) {
    return { error: 'Error generating reset token!' };
  }

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: 'Reset email sent!' };
};
