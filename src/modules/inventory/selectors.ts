import type { RootState } from '@/app/store';

export const selectInventory = (state: RootState) => state.inventoryReducer;
