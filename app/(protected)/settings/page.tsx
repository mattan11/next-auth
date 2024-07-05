'use client';

import { logout } from '@/actions/logout';
import { useCurrentUser } from '@/hooks/useCurrentuxer';

const SettingsPage = () => {
  const user = useCurrentUser();

  const handleClick = async () => {
    await logout();
  };

  return (
    <div className="bg-white p-10 rounded-xl">
      <button
        onClick={handleClick}
        type="submit"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
