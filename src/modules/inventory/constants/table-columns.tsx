import type { IItem } from '../models';
import { DefaultCell } from '../components/DefaultCell';
import { SortButton } from '../components/SortButton';
import { PriceCell } from '../components/PriceCell';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<IItem>[] = [
  {
    accessorKey: 'product',
    header: 'Product',
    cell: ({ row }) => <DefaultCell dataKey="product" {...row} />,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <SortButton label={'Category'} {...column} />,
    cell: ({ row }) => <DefaultCell dataKey="category" {...row} />,
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
];
