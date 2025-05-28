import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '@/modules/auth/selectors';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { isPending, currentUser } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!isPending && !currentUser) navigate('/');
  }, [isPending, currentUser, navigate]);
};
