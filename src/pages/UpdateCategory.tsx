import { Header } from '@/components/layout/Header';
import { useAppSelector } from '@/hooks/redux';
import { CategoryForm } from '@/modules/categories';
import { updateCategory } from '@/modules/categories';
import { selectCategoryItem } from '@/modules/categories';
import { Plus } from 'lucide-react';
import { useParams } from 'react-router-dom';

export const UpdateCategory = () => {
  const { id } = useParams();
  const { item } = useAppSelector(state => selectCategoryItem(state, id));
  const breadcrumbs = [
    { path: '/app/categories', label: 'Category' },
    {
      path: `/app/categories/${id}`,
      label: id ?? 'Category...',
    },
  ];

  return (
    <>
      <Header title="Update category" breadcrumbs={breadcrumbs} />
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
