import { type HTMLProps } from 'react';
import type { Row } from '@tanstack/react-table';
import { formatPrice } from '@/lib/utils';

type Props<TData> = {
  dataKey: string;
} & Row<TData> &
  HTMLProps<HTMLDivElement>;

export const PriceCell = <TData,>({
  dataKey,
  getValue,
  className,
}: Props<TData>) => {
  const amount = parseFloat(getValue(dataKey));

  const formatted = formatPrice(amount);

  return <div className={className}>{formatted ?? 'N/A'}</div>;
};
