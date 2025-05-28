import { useAppSelector } from '@/hooks/redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../selectors';

export const useUnauthorizedOnly = () => {
  const navigate = useNavigate();
  const { isPending, currentUser } = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (!isPending && currentUser) navigate('/app');
  }, [currentUser, isPending, navigate]);
};
