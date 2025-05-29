import { useAppSelector } from '@/hooks/redux';
import { selectCurrentUser } from '../store/selectors';
import { LoaderCircle } from 'lucide-react';

export const ProfileLink = () => {
  const { isPending, currentUser } = useAppSelector(selectCurrentUser);

  return (
    <article className="w-12 p-2 aspect-square flex items-center justify-center rounded-full border border-zinc-200  bg-slate-50">
      {isPending ? (
        <LoaderCircle className="animate-spin " />
      ) : (
        <span className="text-zinc-400">{currentUser?.displayName?.at(0)}</span>
      )}
    </article>
  );
};
