import { useState } from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { LoaderCircle } from 'lucide-react';
import { ItemListHeader } from './ItemListHeader';
import { ItemListBody } from './ItemListBody';

type ItemsListProps<T> = {
  isPending: boolean;
  items: T[];
  searchDataKey: keyof T & string;
  addNewLink?: string;
  columns: ColumnDef<T>[];
};

export const ItemsList = <T extends { id?: string }>({
  isPending,
  items,
  columns,
  searchDataKey,
  addNewLink,
}: ItemsListProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable<T>({
    data: items,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <ItemListHeader
        table={table}
        searchDataKey={searchDataKey}
        addNewLink={addNewLink}
      />
      {isPending ? (
        <LoaderCircle className="animate-spin mx-auto" />
      ) : (
        <ItemListBody table={table} columns={columns} />
      )}
    </>
  );
};
