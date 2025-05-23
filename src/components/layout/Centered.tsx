import { Outlet } from 'react-router-dom';

export const Centered = () => {
  return (
    <main className="min-h-dvh flex items-center justify-center px-[5%] bg-slate-50">
      <Outlet />
    </main>
  );
};
