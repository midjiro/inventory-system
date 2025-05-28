import { Header } from '@/components/layout/Header';
import { AddItemForm } from '@/modules/inventory/components/AddItemForm';

export const AddItem = () => {
  return (
    <>
      <Header title="Add new item" />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <AddItemForm />
      </section>
    </>
  );
};
