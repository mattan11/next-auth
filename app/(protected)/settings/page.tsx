import React from 'react';
import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation';

const SettingsPage = async () => {
  const session = await auth();

  return (
    <>
      <div>{JSON.stringify(session, null, 2)}</div>
      <form
        action={async () => {
          'use server';

          await signOut({
            redirectTo: '/sign-in',
          }); // This method works only on the server side
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
};

export default SettingsPage;
