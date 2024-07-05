'use client';

import { FaUser } from 'react-icons/fa';
import { ExitIcon } from '@radix-ui/react-icons';

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/useCurrentuxer';
import { LogOutButton } from '@/components/auth/LogOut';

const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.image || ''}
            alt="User avatar"
          />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-40"
        align="end"
      >
        <LogOutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </LogOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
