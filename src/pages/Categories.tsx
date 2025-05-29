import { Header } from '@/components/layout/Header';
import { ItemsList } from '@/components/layout/ItemList';
import { useAppSelector } from '@/hooks/redux';
import { columns } from '@/modules/categories/constants/table-columns';

import { selectCategories } from '@/modules/categories/store/selectors';

export const Categories = () => {
  const { isPending, items } = useAppSelector(selectCategories);

  return (
    <>
      <Header title={'Categories'} />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <ItemsList
          items={items}
          searchDataKey={'name'}
          addNewLink="/app/add-category"
          isPending={!!isPending}
          columns={columns}
        />
      </section>
    </>
  );
};
