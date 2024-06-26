'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

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
    if (mode === 'modal') {
      // open modal
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <span
      onClick={handleClick}
      className={'cursor-pointer'}
    >
      {children}
    </span>
  );
};
