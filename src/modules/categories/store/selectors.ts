import type { RootState } from '@/app/store';

export const selectCategories = (state: RootState) => state.categoryReducer;
