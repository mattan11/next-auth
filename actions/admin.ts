'use server';

import { currentAuthRole } from '@/lib/currentAuthUser';
import { UserRole } from '@prisma/client';

export const admin = async () => {
  const role = await currentAuthRole();

  if (role === UserRole.ADMIN) {
    return { success: 'Allowed' };
  }
  return { error: 'Forbidden' };
};
