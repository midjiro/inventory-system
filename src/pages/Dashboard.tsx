import { Header } from '@/components/layout/Header';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '@/modules/auth';
import { UnverifiedAlert } from '@/modules/auth/components/UnverfifiedAlert';
import { PopularCategoriesChart } from '@/modules/inventory/components/TrendingCategories';
import { WarehouseLoadChart } from '@/modules/inventory/components/WarehouseLoadChart';

export const Dashboard = () => {
  const { currentUser } = useAppSelector(selectCurrentUser);

  return (
    <section className="space-y-6">
      <Header title="Dashboard" />
      {!currentUser?.emailVerified && <UnverifiedAlert />}
      <section className="flex flex-wrap items-stretch gap-6">
        <WarehouseLoadChart className="min-w-[288px] basis-1/3 flex-grow flex-shrink" />
        <PopularCategoriesChart className="min-w-[288px] basis-1/3 flex-grow flex-shrink" />
      </section>
    </section>
  );
};
