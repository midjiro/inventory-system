import { Header } from '@/components/layout/Header';
import { ItemsList } from '@/components/layout/ItemList';
import { useAppSelector } from '@/hooks/redux';
import { columns } from '@/modules/categories';

import { selectCategories } from '@/modules/categories';

export const Categories = () => {
  const { isPending, items } = useAppSelector(selectCategories);

  return (
    <>
      <Header title={'Categories'} />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <ItemsList
          items={items}
          searchDataKey={'name'}
          addNewLink="/app/categories/add"
          isPending={!!isPending}
          columns={columns}
        />
      </section>
    </>
  );
};
