import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ProfileLink } from '@/modules/auth/components/ProfileLink';

export const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="flex justify-between items-center mt-8 p-6 bg-white border border-zinc-200 rounded-lg">
      <h2>{title}</h2>
      <div className="flex items-center gap-4">
        <ProfileLink />
        <SidebarTrigger variant={'default'} />
      </div>
    </header>
  );
};
