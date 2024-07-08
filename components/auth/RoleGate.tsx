'use client';

import type { ReactNode } from 'react';
import { UserRole } from '@prisma/client';
import { useCurrentRole } from '@/hooks/useCurrentRole';
import { FormError } from '@/components/FormError';

type RoleGateProps = {
  children: ReactNode;
  allowedRole: UserRole;
};

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return <FormError message="You do not have permission" />;
  }

  return <>{children}</>;
};

export default RoleGate;
