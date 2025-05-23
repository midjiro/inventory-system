import type { User } from 'firebase/auth';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { login, register } from './actions';

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
  reducers: {},
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
      .addMatcher(isAnyOf(login.pending, register.pending), state => {
        state.isPending = true;
      })
      .addMatcher(isAnyOf(login.rejected, register.rejected), state => {
        state.isPending = false;
      }),
});

export default userSlice.reducer;
