import type { Row } from '@tanstack/react-table';
import type { HTMLProps } from 'react';

type Props<TData> = {
  dataKey: string;
} & Row<TData> &
  HTMLProps<HTMLDivElement>;

export const DefaultCell = <TData,>({
  dataKey,
  getValue,
  className,
}: Props<TData>) => {
  const value = getValue(dataKey);

  return <div className={className}>{(value as string) ?? 'N/A'}</div>;
};
