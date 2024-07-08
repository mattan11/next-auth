import { auth } from '@/lib/auth';

export const currentAuthUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentAuthRole = async () => {
  const session = await auth();

  return session?.user.role;
};
