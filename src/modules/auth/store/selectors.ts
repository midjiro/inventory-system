import type { RootState } from '@/app/store';

export const selectCurrentUser = (state: RootState) => state.userReducer;
export const selectUserPending = (state: RootState) =>
  state.userReducer.isPending;
