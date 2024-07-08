import React from 'react';
import { currentAuthUser } from '@/lib/currentAuthUser';
import UserInfo from '@/components/UserInfo';

const ServerPage = async () => {
  const user = await currentAuthUser();

  return (
    <UserInfo
      user={user}
      label="Server Page"
    />
  );
};

export default ServerPage;
