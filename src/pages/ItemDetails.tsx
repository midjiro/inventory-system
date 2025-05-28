import { Header } from '@/components/layout/Header';
import { Details } from '@/modules/inventory/components/Details';
import { useParams } from 'react-router-dom';

export const ItemDetails = () => {
  const { id } = useParams();

  return (
    <>
      <Header title={'Product Details'} />
      <section className="p-6 border border-zinc-200 bg-white rounded-lg">
        <Details id={id} />
      </section>
    </>
  );
};
