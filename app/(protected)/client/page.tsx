'use client';

import React from 'react';
import UserInfo from '@/components/UserInfo';
import { useCurrentUser } from '@/hooks/useCurrentuxer';

const ClientPage = () => {
  const user = useCurrentUser();

  return (
    <UserInfo
      user={user}
      label="Client Page"
    />
  );
};

export default ClientPage;
