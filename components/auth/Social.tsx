'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes/routes';

export const Social = () => {
  const handleClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full gap-x-2"
        variant="outline"
        onClick={() => handleClick('google')}
      >
        <FcGoogle /> Google
      </Button>
      <Button
        size="lg"
        className="w-full gap-x-2"
        variant="outline"
        onClick={() => handleClick('github')}
      >
        <FaGithub /> Github
      </Button>
    </div>
  );
};
