import { Header } from '@/components/layout/Header';
import { ItemsList } from '@/components/layout/ItemList';
import { useAppSelector } from '@/hooks/redux';
import { selectInventory } from '@/modules/inventory';
import { columns } from '@/modules/inventory';

export const Inventory = () => {
  const { isPending, items } = useAppSelector(selectInventory);

  return (
    <>
      <Header title="Inventory " />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <ItemsList
          items={items}
          searchDataKey={'product'}
          addNewLink="/app/inventory/add"
          isPending={!!isPending}
          columns={columns}
        />
      </section>
    </>
  );
};
