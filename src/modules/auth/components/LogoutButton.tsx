import React, { type HTMLProps } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LoaderCircle, LogOut } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '../store/selectors';
import { logout } from '../store/actions';
import { toast } from 'sonner';

export const LogoutButton: React.FC<HTMLProps<HTMLButtonElement>> = ({
  className,
}) => {
  const dispatch = useAppDispatch();

  const { isPending, currentUser } = useAppSelector(selectCurrentUser);
  const handleClick = () =>
    dispatch(logout())
      .unwrap()
      .then(() => toast.success('Logged out successfully'))
      .catch(msg => toast.error(msg));

  return (
    <Button
      variant={'ghost'}
      className={cn('justify-start', className)}
      disabled={isPending || !currentUser}
      onClick={handleClick}
    >
      {isPending ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          <LogOut />
          <span>Logout</span>
        </>
      )}
    </Button>
  );
};
