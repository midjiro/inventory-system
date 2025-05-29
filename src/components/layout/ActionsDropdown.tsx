import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useAppDispatch } from '@/hooks/redux';
import { Link } from 'react-router-dom';
import type { removeInventoryItem } from '@/modules/inventory';
import type { removeCategory } from '@/modules/categories/store/actions';
import { toast } from 'sonner';
import { useVerifiedOnly } from '@/modules/auth/hooks/useVerifiedOnly';

interface ActionsDropdownProps<T extends { id: string }> {
  item: T;
  showMoreLink?: string;
  updateLink?: string;
  onDelete: typeof removeInventoryItem | typeof removeCategory;
}

export const ActionsDropdown = <T extends { id: string }>({
  item,
  showMoreLink,
  updateLink,
  onDelete,
}: ActionsDropdownProps<T>) => {
  const allowedAction = useVerifiedOnly();
  const dispatch = useAppDispatch();

  const handleDelete = ({ id }: { id: string }) =>
    dispatch(onDelete(id))
      .unwrap()
      .then(() => toast.success('Deleted successfully!'))
      .catch(msg => toast.error(msg));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {showMoreLink && (
          <DropdownMenuItem asChild>
            <Link to={showMoreLink}>
              <Eye />
              <span>Show more</span>
            </Link>
          </DropdownMenuItem>
        )}

        {updateLink && (
          <DropdownMenuItem asChild disabled={!allowedAction}>
            <Link to={updateLink}>
              <Pencil />
              <span>Update</span>
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleDelete(item)}
          disabled={!allowedAction}
        >
          <Trash className="text-red-600" />
          <span className="text-red-600">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
