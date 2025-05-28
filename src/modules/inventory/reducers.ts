import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { IItem } from './models';
import { addInventoryItem, fetchInventory } from './actions';

interface State {
  items: IItem[] | [];
  isPending?: boolean;
}

const INITIAL_STATE: State = {
  items: [],
  isPending: false,
};

const inventorySlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    addUser: (state, action) => {
      state.isPending = false;
      state.items = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.isPending = false;
        state.items = action.payload;
      })
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.isPending = false;
        if (action.payload) state.items.push(action.payload);
      })

      .addMatcher(
        isAnyOf(fetchInventory.pending, addInventoryItem.pending),
        state => {
          state.isPending = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchInventory.rejected, addInventoryItem.rejected),
        state => {
          state.isPending = false;
        }
      ),
});

export default inventorySlice.reducer;
