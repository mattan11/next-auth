'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { LoginForm } from '@/components/auth/LoginForm';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = 'redirect',
  asChild = false,
}: LoginButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/sign-in');
  };

  if (mode === 'modal') {
    return (
      <>
        <Dialog>
          <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
          <DialogContent className="p-0 w-auto bg-transparent">
            <LoginForm />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <span
      onClick={handleClick}
      className={'cursor-pointer'}
    >
      {children}
    </span>
  );
};
