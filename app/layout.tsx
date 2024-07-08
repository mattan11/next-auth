import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { auth } from '@/lib/auth';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Auth App',
  description: 'Boilerplate for Next.js with authentication',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
