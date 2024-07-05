'use server';

import { signOut } from '@/lib/auth';

export const logout = async () => {
  // do some server stuff

  await signOut({
    redirectTo: '/sign-in',
  });
};
