'use client';

import type { ReactNode } from 'react';
import { logout } from '@/actions/logout';

type LogOutButtonProps = {
  children: ReactNode;
};

export const LogOutButton = ({ children }: LogOutButtonProps) => {
  const handleClick = async () => {
    await logout();
  };

  return (
    <span
      onClick={handleClick}
      className="cursor-pointer"
    >
      {children}
    </span>
  );
};
