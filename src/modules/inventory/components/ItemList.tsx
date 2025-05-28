import { useEffect, useState } from 'react';
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectInventory } from '../selectors';
import { fetchInventory } from '../actions';
import { columns } from '../constants/table-columns';
import { SearchField } from './SearchField';
import { ArrowLeft, ArrowRight, LoaderCircle, PackagePlus } from 'lucide-react';
import { ColumnSelect } from './ColumnSelect';
import { Link, useNavigate } from 'react-router-dom';

export const ItemsList = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { isPending, items } = useAppSelector(selectInventory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const table = useReactTable({
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

  const headers = table.getHeaderGroups();
  const rowModels = table.getRowModel();

  if (isPending)
    return (
      <>
        <section className="flex flex-wrap justify-between items-center gap-y-4 gap-x-6 py-4">
          <SearchField dataKey="product" table={table} />
          <div className="flex items-center gap-2">
            <Button variant={'outline'} asChild>
              <Link to="/app/add">
                <PackagePlus />
                <span>Add new</span>
              </Link>
            </Button>
            <ColumnSelect table={table} />
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeft />
            </Button>
            <Button
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRight />
            </Button>
          </div>
        </section>
        <LoaderCircle className="animate-spin mx-auto" />
      </>
    );

  return (
    <>
      <section className="flex flex-wrap justify-between items-center gap-y-4 gap-x-6 py-4">
        <SearchField dataKey="product" table={table} />
        <div className="flex items-center gap-2">
          <Button variant={'outline'} asChild>
            <Link to="/app/add">
              <PackagePlus />
              <span>Add new</span>
            </Link>
          </Button>
          <ColumnSelect table={table} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </Button>
        </div>
      </section>

      <Table>
        <TableHeader>
          {headers.map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rowModels.rows.length ? (
            rowModels.rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => {
                  const itemId = row.original.id;
                  if (itemId) {
                    navigate(`/app/details/${itemId}`);
                  }
                }}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="p-4 text-center">
                No data find.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};
