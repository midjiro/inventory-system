import { useAppSelector } from '@/hooks/redux';
import { selectInventoryItem } from '../selectors';
import type React from 'react';
import {
  Circle,
  DollarSign,
  LoaderCircle,
  Locate,
  Package,
  ScanBarcode,
  Tag,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { cn, formatPrice } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';

export const Details: React.FC<{ id: string | undefined }> = ({ id }) => {
  const { isPending, item } = useAppSelector(state =>
    selectInventoryItem(state, id)
  );

  if (isPending) return <LoaderCircle className="animate-spin mx-auto" />;

  if (!id || !item)
    return (
      <article className="min-w-[288px] w-full max-w-1/3 text-center mx-auto">
        <p>Ooops...</p>
        <h2 className="mt-2 mb-4">No data found</h2>
        <p>
          We are unable to find data associated with that product. Try again or
          <Link
            to="/app/inventory"
            className={cn(buttonVariants({ variant: 'link' }), 'px-2')}
          >
            get back to inventory
          </Link>
        </p>
      </article>
    );

  return (
    <article className="flex flex-wrap justify-center items-center gap-6">
      <QRCodeSVG
        title={item.sku}
        value={item.sku}
        level="H"
        className="min-w-[288px] basis-1/4 flex-grow flex-shrink"
      />
      <div className="min-w-[288px] basis-1/3 flex-grow flex-shrink space-y-4">
        <div className="flex items-center gap-4 mb-8">
          <h2>{item.product}</h2>
          <Badge
            variant={'outline'}
            className={cn('flex items-center gap-1 py-2 px-4', {
              'bg-green-100 border-green-400 text-green-400':
                item.unitPrice === 'In stock',
              'bg-orange-100 border-orange-400 text-orange-400':
                item.unitPrice === 'Low stock',
              'bg-red-100 border-red-400 text-red-400':
                item.unitPrice === 'Out of stock',
              'bg-zinc-100 border-zinc-400 text-zinc-400':
                item.unitPrice === 'Discontinued',
            })}
          >
            <Circle />
            <span>{item.unitPrice}</span>
          </Badge>
        </div>
        <p className="capitalize flex items-center gap-1">
          <Tag size={18} />
          <span>Category: {item.category}</span>
        </p>
        <p className="uppercase flex items-center gap-1">
          <ScanBarcode size={18} />
          <span>Sku: {item.sku}</span>
        </p>
        <p className="capitalize flex items-center gap-1">
          <Package size={18} />
          <span>Items available: {item.available}</span>
        </p>
        <p className="capitalize flex items-center gap-1">
          <Locate size={18} />
          <span>Location: {item.location}</span>
        </p>
        <p className="capitalize flex items-center gap-1">
          <DollarSign size={18} />
          <span>Total Revenue: {formatPrice(item.totalRevenue)}</span>
        </p>
      </div>
    </article>
  );
};
