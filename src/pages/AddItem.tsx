import { Header } from '@/components/layout/Header';
import { addInventoryItem } from '@/modules/inventory';
import { ItemForm } from '@/modules/inventory';
import { PackagePlus } from 'lucide-react';

export const AddItem = () => {
  return (
    <>
      <Header title="Add new item" />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <ItemForm
          action={addInventoryItem}
          submitLabel="Add item"
          submitIcon={PackagePlus}
          submitMessage="New item was successfully added."
        />
      </section>
    </>
  );
};
