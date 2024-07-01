import { db } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from '@/data/verifiactionToken';

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};
