import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '@/hooks/redux';
import { auth } from '@/lib/firebsae';
import { toast } from 'sonner';
import { loginFromCache } from '../store/actions';

export const useAutoLogin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(loginFromCache(user))
        .unwrap()
        .catch(msg => toast.error(msg));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
