import React, { type HTMLProps } from 'react';
import type { Row } from '@tanstack/react-table';
import type { IItem } from '../models';

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

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return <div className={className}>{formatted ?? 'N/A'}</div>;
};
