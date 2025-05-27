import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useAppDispatch } from '@/hooks/redux';
import { addUser } from '../reducers';
import { auth } from '@/lib/firebsae';

export const useAutoLogin = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) return;

      user
        .getIdToken(true)
        .then(() => user.reload())
        .then(() => dispatch(addUser(user)));
    });

    return () => unsubscribe();
  }, [dispatch]);
};
