'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full gap-x-2"
        variant="outline"
        onClick={() => console.log('Google')}
      >
        <FcGoogle /> Google
      </Button>
      <Button
        size="lg"
        className="w-full gap-x-2"
        variant="outline"
        onClick={() => console.log('Github')}
      >
        <FaGithub /> Github
      </Button>
    </div>
  );
};
