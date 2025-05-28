import React, { type HTMLProps } from 'react';
import type { Row } from '@tanstack/react-table';
import type { IItem } from '../models';
import { formatPrice } from '@/lib/utils';

type Props = {
  dataKey: string;
} & Row<IItem> &
  HTMLProps<HTMLDivElement>;

export const PriceCell: React.FC<Props> = ({
  dataKey,
  getValue,
  className,
}) => {
  const amount = parseFloat(getValue(dataKey));

  const formatted = formatPrice(amount);

  return <div className={className}>{formatted ?? 'N/A'}</div>;
};
