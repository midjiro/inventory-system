import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ProfileLink } from '@/modules/auth/components/ProfileLink';
import { CustomBreadcrumb, type BreadcrumbLinkItem } from './CustomBreadcrumb';

export const Header: React.FC<{
  title: string;
  breadcrumbs?: BreadcrumbLinkItem[];
}> = ({ title, breadcrumbs }) => {
  return (
    <header className="flex justify-between items-center mt-8 p-6 bg-white border border-zinc-200 rounded-lg">
      {breadcrumbs ? (
        <div className="space-y-2">
          <h2>{title}</h2>
          <CustomBreadcrumb links={breadcrumbs} />
        </div>
      ) : (
        <h2>{title}</h2>
      )}

      <div className="flex items-center gap-4">
        <ProfileLink />
        <SidebarTrigger variant={'default'} />
      </div>
    </header>
  );
};
