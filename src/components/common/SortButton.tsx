import { type HTMLProps } from 'react';
import type { Column } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props<TData> = { label: string } & Column<TData> & HTMLProps<HTMLElement>;

export const SortButton = <TData,>({
  label,
  toggleSorting,
  getIsSorted,
  className,
}: Props<TData>) => {
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
