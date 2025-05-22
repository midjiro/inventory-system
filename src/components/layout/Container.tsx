import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from './Header';

export const Container = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-slate-50 px-[2.5%] space-y-8">
        <Header />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
