import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '../selectors';

export const useVerifiedOnly = () => {
  const { isPending, currentUser } = useAppSelector(selectCurrentUser);

  if (isPending || !currentUser) return false;

  return currentUser.emailVerified;
};
