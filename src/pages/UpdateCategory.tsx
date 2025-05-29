import { Header } from '@/components/layout/Header';
import { useAppSelector } from '@/hooks/redux';
import { CategoryForm } from '@/modules/categories/components/CategoryForm';
import { updateCategory } from '@/modules/categories/store/actions';
import { selectCategoryItem } from '@/modules/categories/store/selectors';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const UpdateCategory = () => {
  const { id } = useParams();
  const { item } = useAppSelector(state => selectCategoryItem(state, id));

  return (
    <>
      <Header title="Update category" />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <CategoryForm
          action={updateCategory}
          submitLabel="Update"
          submitIcon={Plus}
          submitMessage="Category was successfully updated."
          defaultValues={item}
        />
      </section>
    </>
  );
};
