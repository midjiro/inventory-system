import { Input } from '@/components/ui/input';
import { type Table } from '@tanstack/react-table';
import React, { type ChangeEvent } from 'react';

export const SearchField: React.FC<{ dataKey: string; table: Table<any> }> = ({
  dataKey,
  table,
}) => {
  const column = table.getColumn(dataKey);
  const value = column ? column.getFilterValue() : '';
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!column) return;

    column.setFilterValue(event.target.value);
  };

  return (
    <Input
      placeholder="Filter products..."
      value={value as string}
      onChange={handleChange}
      className="max-w-sm"
    />
  );
};
