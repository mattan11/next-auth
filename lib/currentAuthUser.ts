import { auth } from '@/lib/auth';

export const currentAuthUser = async () => {
  const session = await auth();

  return session?.user;
};
