import type { IItem } from '../models';
import { DefaultCell } from '@/components/common/DefaultCell';
import { SortButton } from '@/components/common/SortButton';
import { PriceCell } from '@/components/common/PriceCell';
import type { ColumnDef } from '@tanstack/react-table';
import { ActionsDropdown } from '@/components/layout/ActionsDropdown';
import { removeInventoryItem } from '../actions';

export const columns: ColumnDef<IItem>[] = [
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => <DefaultCell dataKey="product" {...row} />,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortButton label={'Category'} {...column} />,
    cell: ({ row }) => (
      <DefaultCell dataKey="category" className="capitalize" {...row} />
    ),
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => (
      <DefaultCell dataKey="sku" {...row} className="uppercase" />
    ),
  },
  {
    accessorKey: 'available',
    header: 'Available',
    cell: ({ row }) => <DefaultCell dataKey="available" {...row} />,
  },
  {
    accessorKey: 'unitPrice',
    header: ({ column }) => <SortButton label="Unit price" {...column} />,
    cell: ({ row }) => <DefaultCell dataKey="unitPrice" {...row} />,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => <SortButton label="Location" {...column} />,
    cell: ({ row }) => <DefaultCell dataKey="location" {...row} />,
  },
  {
    accessorKey: 'totalRevenue',
    header: ({ column }) => <SortButton label="Total revenue" {...column} />,

    cell: ({ row }) => <PriceCell dataKey="totalRevenue" {...row} />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const item = row.original;

      return (
        <ActionsDropdown
          item={item}
          showMoreLink={`/app/details/${item.id}`}
          updateLink={`/app/edit/${item.id}`}
          onDelete={removeInventoryItem}
        />
      );
    },
  },
];
