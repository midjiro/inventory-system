import { Header } from '@/components/layout/Header';
import { CategoryForm } from '@/modules/categories/components/CategoryForm';
import { createCategory } from '@/modules/categories/store/actions';

import { Plus } from 'lucide-react';

export const AddCategory = () => {
  return (
    <>
      <Header title="Add new category" />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <CategoryForm
          action={createCategory}
          submitLabel="Add category"
          submitIcon={Plus}
          submitMessage="New category was successfully added."
        />
      </section>
    </>
  );
};
