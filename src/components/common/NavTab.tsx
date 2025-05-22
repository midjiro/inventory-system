import type React from 'react';
import { icons } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavTabProps {
  icon: keyof typeof icons;
  label: string;
  to: string;
}

export const NavTab: React.FC<NavTabProps> = ({ icon, label, to }) => {
  const Icon = icons[icon];
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          buttonVariants({ variant: isActive ? 'default' : 'ghost' }),
          'justify-start'
        )
      }
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </NavLink>
  );
};
