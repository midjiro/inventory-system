import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { type IItem } from './models';
import { selectCategories } from '../categories/store/selectors';

export const selectInventory = (state: RootState) => state.inventoryReducer;
export const selectInventoryItem = createSelector(
  selectInventory,
  (_, id) => id,
  ({ isPending, items }: { isPending: boolean; items: IItem[] | [] }, id) => {
    return {
      isPending,
      item: items.find((item: IItem) => item.id === id) ?? null,
    };
  }
);

export const selectCategoriesWithLoading = createSelector(
  [selectInventory, selectCategories],
  (itemsState, categoriesState) => ({
    categories: categoriesState.items,
    isPending: itemsState.isPending || categoriesState.isPending,
  })
);
