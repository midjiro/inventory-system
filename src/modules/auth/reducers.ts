import type { User } from 'firebase/auth';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, logout, register, verify } from './actions';

interface State {
  currentUser: User | undefined | null;
  isPending?: boolean;
}

const INITIAL_STATE: State = {
  currentUser: null,
  isPending: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    addUser: (state, action) => {
      state.isPending = false;
      state.currentUser = action.payload;
    },
  },
  extraReducers: builder =>
    builder

      .addCase(login.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload;
      })
      .addCase(logout.fulfilled, state => {
        state.isPending = false;
        state.currentUser = null;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isPending = false;
        state.currentUser = action.payload;
      })
      .addMatcher(
        isAnyOf(
          login.pending,
          register.pending,
          logout.pending,
          verify.pending
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
          verify.rejected
        ),
        state => {
          state.isPending = false;
        }
      ),
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
