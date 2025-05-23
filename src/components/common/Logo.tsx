import logo from '@/app/assets/images/logo.svg';
import { cn } from '@/lib/utils';
import type { HTMLProps } from 'react';

export const Logo = ({ className, ...props }: HTMLProps<HTMLImageElement>) => {
  return (
    <img
      src={logo}
      alt="Inventory system"
      className={cn('max-w-1/2 object-scale-down aspect-video', className)}
      {...props}
    />
  );
};
