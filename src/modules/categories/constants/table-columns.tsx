import type { ICategory } from '../model';
import { DefaultCell } from '@/components/common/DefaultCell';
import { SortButton } from '@/components/common/SortButton';
import { TimestampCell } from '@/components/common/TimestampCell';
import type { ColumnDef } from '@tanstack/react-table';
import { deleteCategory } from '../store/actions';
import { ActionsDropdown } from '@/components/layout/ActionsDropdown';

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortButton label={'Name'} {...column} />,
    cell: ({ row }) => <DefaultCell dataKey="name" {...row} />,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <DefaultCell dataKey="description" {...row} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <SortButton label={'Created at'} {...column} />,
    cell: ({ row }) => <TimestampCell dataKey="createdAt" {...row} />,
  },
  {
    accessorKey: 'updatedAt',

    header: ({ column }) => <SortButton label={'Updated at'} {...column} />,
    cell: ({ row }) => <TimestampCell dataKey="updatedAt" {...row} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const item = row.original;

      return <ActionsDropdown item={item} onDelete={deleteCategory} />;
    },
  },
];
