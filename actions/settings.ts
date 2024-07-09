'use server';

import * as z from 'zod';
import { db } from '@/lib/db';
import { SettingsSchema } from '@/schemas';
import { getUserById } from '@/data/user';
import { currentAuthUser } from '@/lib/currentAuthUser';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentAuthUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: 'Unauthorized' };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated' };
};
