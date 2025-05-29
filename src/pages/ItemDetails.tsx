import { Header } from '@/components/layout/Header';
import { Details } from '@/modules/inventory';
import { useParams } from 'react-router-dom';

export const ItemDetails = () => {
  const { id } = useParams();
  const breadcrumbs = [
    { path: '/app/inventory', label: 'Inventory' },
    {
      path: `/app/inventory/${id}`,
      label: id ?? 'Product...',
    },
  ];

  return (
    <>
      <Header title={'Product Details'} breadcrumbs={breadcrumbs} />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <Details id={id} />
      </section>
    </>
  );
};
