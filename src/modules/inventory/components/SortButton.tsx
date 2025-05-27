import React, { type HTMLProps } from 'react';
import type { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IItem } from '../models';
import { cn } from '@/lib/utils';

type Props = { label: string } & Column<IItem> & HTMLProps<HTMLElement>;

export const SortButton: React.FC<Props> = ({
  label,
  toggleSorting,
  getIsSorted,
  className,
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => toggleSorting(getIsSorted() === 'asc')}
      className={cn('capitalize', className)}
    >
      {label}
      <ArrowUpDown />
    </Button>
  );
};
