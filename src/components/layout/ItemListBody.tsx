import { flexRender, type ColumnDef, type Table } from '@tanstack/react-table';
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export function ItemListBody<T extends { id?: string }>({
  table,
  columns,
}: {
  table: Table<T>;
  columns: ColumnDef<T>[];
}) {
  const headers = table.getHeaderGroups();
  const rowModels = table.getRowModel();

  return (
    <UITable>
      <TableHeader>
        {headers.map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rowModels.rows.length ? (
          rowModels.rows.map(row => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
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
              No data found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </UITable>
  );
}
