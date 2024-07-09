'use client';

import { useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { settings } from '@/actions/settings';

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    startTransition(async () => {
      await settings({
        name: 'John Doe',
      });

      await update();
    });
  };

  return (
    <Card className="w-4/5 max-w-2xl">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Settings</p>
      </CardHeader>
      <CardContent>
        <Button
          disabled={isPending}
          className="w-full"
          onClick={handleClick}
        >
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
