import { Header } from '@/components/layout/Header';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '@/modules/auth';
import { UnverifiedAlert } from '@/modules/auth/components/UnverfifiedAlert';
import {
  TrendingCategoriesChart,
  WarehouseLoadChart,
} from '@/modules/inventory';

export const Dashboard = () => {
  const { currentUser } = useAppSelector(selectCurrentUser);

  return (
    <section className="space-y-6">
      <Header title="Dashboard" />
      {!currentUser?.emailVerified && <UnverifiedAlert />}
      <section className="flex flex-wrap items-stretch gap-6">
        <WarehouseLoadChart className="min-w-[288px] basis-1/3 flex-grow flex-shrink" />
        <TrendingCategoriesChart className="min-w-[288px] basis-1/3 flex-grow flex-shrink" />
      </section>
    </section>
  );
};
