import { Header } from '@/components/layout/Header';
import { ItemsList } from '@/modules/inventory';

export const Inventory = () => {
  return (
    <>
      <Header title="Inventory " />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <ItemsList />
      </section>
    </>
  );
};
