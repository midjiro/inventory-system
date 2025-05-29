import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { SearchField } from './SearchField';
import { ColumnSelect } from './ColumnSelect';
import { ArrowLeft, ArrowRight, PackagePlus } from 'lucide-react';
import { type Table } from '@tanstack/react-table';

export function ItemListHeader<T>({
  table,
  searchDataKey,
  addNewLink,
}: {
  table: Table<T>;
  searchDataKey: string;
  addNewLink?: string;
}) {
  return (
    <section className="flex flex-wrap justify-between items-center gap-y-4 gap-x-6 py-4">
      <SearchField dataKey={searchDataKey} table={table} />
      <div className="flex items-center gap-2">
        {addNewLink && (
          <Button variant="outline" asChild>
            <Link to={addNewLink}>
              <PackagePlus />
              <span>Add new</span>
            </Link>
          </Button>
        )}
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
  );
}
