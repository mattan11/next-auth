import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import authConfig from '@/lib/auth.config';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth accounts to sign in without email verification
      console.log(account, 'account');
      if (account?.provider !== 'credentials') {
        return true;
      }

      const existingUser = await getUserById(user.id);

      // If the user doesn't exist or hasn't verified their email, prevent sign in
      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token, user, profile }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
});
