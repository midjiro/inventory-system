import type { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import type { ICategory } from '../model';

export const selectCategories = (state: RootState) => state.categoryReducer;
export const selectCategoryItem = createSelector(
  selectCategories,
  (_, id: string) => id,
  (
    { isPending, items }: { isPending: boolean; items: ICategory[] | [] },
    id
  ) => {
    return {
      isPending,
      item: items.find((item: ICategory) => item.id === id) ?? null,
    };
  }
);
