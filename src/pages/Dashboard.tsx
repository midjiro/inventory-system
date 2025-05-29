import { Header } from '@/components/layout/Header';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '@/modules/auth';
import { UnverifiedAlert } from '@/modules/auth/components/UnverfifiedAlert';

export const Dashboard = () => {
  const { currentUser } = useAppSelector(selectCurrentUser);

  return (
    <section className="space-y-6">
      <Header title="Dashboard" />
      {!currentUser?.emailVerified && <UnverifiedAlert />}
    </section>
  );
};
