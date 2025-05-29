import React, { type HTMLProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { removeInventoryItem } from '../actions';
import { useAppDispatch } from '@/hooks/redux';
import { cn } from '@/lib/utils';

export const RemoveItemDialog: React.FC<
  { id: string | undefined } & HTMLProps<HTMLButtonElement>
> = ({ id, className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAgreement = () =>
    dispatch(removeInventoryItem(id))
      .then(() => toast.success('Item successfully removed'))
      .then(() => navigate('/app/inventory'))
      .catch(msg => toast.error(msg));

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(buttonVariants({ variant: 'destructive' }), className)}
        disabled={!id}
      >
        <Trash />
        <span>Remove</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete selected
            item so it's cannot be restored.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleAgreement}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
