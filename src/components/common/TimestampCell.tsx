import type { HTMLProps } from 'react';
import type { Row } from '@tanstack/react-table';
import { Timestamp } from 'firebase/firestore';

type Props<TData> = {
  dataKey: string;
} & Row<TData> &
  HTMLProps<HTMLDivElement>;

export const TimestampCell = <TData,>({
  dataKey,
  getValue,
  className,
}: Props<TData>) => {
  const value = getValue(dataKey);

  let displayValue = 'N/A';

  if (value instanceof Timestamp) {
    displayValue = value.toDate().toLocaleString();
  } else if (typeof value === 'string') {
    const date = new Date(value);
    displayValue = !isNaN(date.getTime()) ? date.toLocaleString() : value;
  }

  return <div className={className}>{displayValue}</div>;
};
