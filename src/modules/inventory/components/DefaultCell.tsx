import type { Row } from '@tanstack/react-table';
import type { IItem } from '../models';
import type React from 'react';
import type { HTMLProps } from 'react';

type Props = {
  dataKey: string;
} & Row<IItem> &
  HTMLProps<HTMLDivElement>;

export const DefaultCell: React.FC<Props> = ({
  dataKey,
  getValue,
  className,
}) => {
  const value = getValue(dataKey);

  return <div className={className}>{(value as string) ?? 'N/A'}</div>;
};
