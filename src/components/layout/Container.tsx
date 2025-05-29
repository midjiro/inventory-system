import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useAuthGuard, useAutoLogin } from '@/modules/auth';
import { useAppDispatch } from '@/hooks/redux';
import { useEffect } from 'react';
import { fetchCategories } from '@/modules/categories/store/actions';
import { fetchInventory } from '@/modules/inventory/actions';

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
