import React from 'react';
import { CardWrapper } from '@/components/auth/CardWrapper';

export const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel={'Welcome Back!'}
      backButtonLabel={"Don't have an account?"}
      backButtonHref={'/sign-up'}
      showSocial
    >
      Login Form
    </CardWrapper>
  );
};
