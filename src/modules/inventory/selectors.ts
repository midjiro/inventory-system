import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { type IItem } from './models';

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
