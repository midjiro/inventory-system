import { Header } from '@/components/layout/Header';
import { CategoryForm } from '@/modules/categories';
import { addCategory } from '@/modules/categories';

import { Plus } from 'lucide-react';

export const AddCategory = () => {
  return (
    <>
      <Header title="Add new category" />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <CategoryForm
          action={addCategory}
          submitLabel="Add category"
          submitIcon={Plus}
          submitMessage="New category was successfully added."
        />
      </section>
    </>
  );
};
