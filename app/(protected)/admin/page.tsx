'use client';

import { useCurrentRole } from '@/hooks/useCurrentRole';
// import {currentAuthRole} from "@/lib/currentAuthUser";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import RoleGate from '@/components/auth/RoleGate';
import { FormSuccess } from '@/components/FormSuccess';
import { UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { admin } from '@/actions/admin';

const AdminPage = () => {
  const role = useCurrentRole(); // client
  // const role = await currentAuthRole() // server

  const onServerActionClick = async () => {
    admin().then(data => {
      if (data.success) {
        toast.success('Allowed Server Action');
      } else {
        toast.error('Not allowed Server Action');
      }
    });
  };

  const onApiRouteClick = async () => {
    fetch('/api/admin').then(response => {
      if (response.ok) {
        toast.success('Allowed API Route');
      } else {
        toast.error('Not allowed API Route');
      }
    });
  };

  return (
    <Card className="w-4/5">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>Admin Panel</p>
      </CardHeader>
      <CardContent className="spacy-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You have access to the admin panel" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg p-2 shadow-md">
          <p className="text-sm font-medium">Admin-only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg p-2 shadow-md">
          <p className="text-sm font-medium">Admin-only Server Action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
