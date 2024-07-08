import { ExtendedUser } from '@/types/next-auth';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ReactNode } from 'react';

type UserInfoProps = {
  user?: ExtendedUser;
  label: string;
  badge?: ReactNode;
};

const UserItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
        {value}
      </p>
    </div>
  );
};

const UserInfo = ({ user, label }: UserInfoProps) => {
  return (
    <Card className="shadow-md w-4/5">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserItem
          label="ID"
          value={user?.id || ''}
        />
        <UserItem
          label="Name"
          value={user?.name || ''}
        />
        <UserItem
          label="Email"
          value={user?.email || ''}
        />
        <UserItem
          label="Role"
          value={user?.role || ''}
        />
        <UserItem
          label="Two Factor Authenctication"
          value={user?.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
        />
      </CardContent>
    </Card>
  );
};

export default UserInfo;
