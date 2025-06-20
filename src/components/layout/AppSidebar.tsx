import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Logo } from '@/components/common/Logo';
import { NavTab } from '@/components/common/NavTab';
import { LogoutButton } from '@/modules/auth';

export const AppSidebar = () => {
  return (
    <Sidebar className="px-4 py-6 bg-white">
      <SidebarHeader className="bg-white">
        <Logo />
        <Separator className="my-4" />
      </SidebarHeader>
      <SidebarContent className="bg-white space-y-4 p-4">
        <NavTab icon="LayoutGrid" label="Dashboard" to="/app" />
        <NavTab icon="Archive" label="Inventory" to="/app/inventory" />
        <NavTab icon="Tag" label="Categories" to="/app/categories" />
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
};
