import { SidebarTrigger } from '@/components/ui/sidebar';

export const Header = () => {
  return (
    <header className="flex justify-between items-center pt-8">
      <SidebarTrigger variant={'default'} />
    </header>
  );
};
