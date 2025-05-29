import { useParams } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { useAppSelector } from '@/hooks/redux';
import { updateInventoryItem } from '@/modules/inventory';
import { ItemForm } from '@/modules/inventory';
import { selectInventoryItem } from '@/modules/inventory';

export const UpdateItem = () => {
  const { id } = useParams();
  const { item } = useAppSelector(state => selectInventoryItem(state, id));
  const breadcrumbs = [
    { path: '/app/inventory', label: 'Inventory' },
    {
      path: `/app/inventory/update/${id}`,
      label: id ?? 'Product...',
    },
  ];

  return (
    <>
      <Header title="Update item information" breadcrumbs={breadcrumbs} />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <ItemForm
          action={updateInventoryItem}
          submitLabel="Update information"
          submitIcon={Package}
          submitMessage="Information about your item was updated."
          defaultValues={item}
        />
      </section>
    </>
  );
};
