import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { useAppDispatch } from '@/hooks/redux';
import { useAuthGuard, useAutoLogin } from '@/modules/auth';
import { fetchCategories } from '@/modules/categories';
import { fetchInventory } from '@/modules/inventory';

export const Container = () => {
  const dispatch = useAppDispatch();

  useAutoLogin();
  useAuthGuard();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchInventory());
  }, [dispatch]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-slate-50 px-[2.5%] space-y-8">
        <Outlet />
      </main>
    </SidebarProvider>
  );
};
