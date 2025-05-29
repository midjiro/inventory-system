import type { User } from 'firebase/auth';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, loginFromCache, logout, register, verify } from './actions';

interface State {
  currentUser: User | undefined | null;
  isPending?: boolean;
}

const INITIAL_STATE: State = {
  currentUser: null,
  isPending: false,
};

const userSlice = createSlice({
  name: 'inventory',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(logout.fulfilled, state => {
        state.isPending = false;
        state.currentUser = null;
      })
      .addMatcher(
        isAnyOf(
          login.fulfilled,
          register.fulfilled,
          verify.fulfilled,
          loginFromCache.fulfilled
        ),
        (state, action) => {
          state.isPending = false;
          state.currentUser = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          login.pending,
          register.pending,
          logout.pending,
          verify.pending,
          loginFromCache.pending
        ),
        state => {
          state.isPending = true;
        }
      )
      .addMatcher(
        isAnyOf(
          login.rejected,
          register.rejected,
          logout.rejected,
          verify.rejected,
          loginFromCache.rejected
        ),
        state => {
          state.isPending = false;
        }
      ),
});

export default userSlice.reducer;
