import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { IItem } from './models';
import {
  addInventoryItem,
  fetchInventory,
  removeInventoryItem,
  updateInventoryItem,
} from './actions';

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
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        state.isPending = false;
        if (action.payload) state.items.push(action.payload);
      })
      .addCase(removeInventoryItem.fulfilled, (state, action) => {
        state.isPending = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          fetchInventory.pending,
          updateInventoryItem.pending,
          addInventoryItem.pending,
          removeInventoryItem.pending
        ),
        state => {
          state.isPending = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchInventory.rejected,
          updateInventoryItem.rejected,
          addInventoryItem.rejected,
          removeInventoryItem.rejected
        ),
        state => {
          state.isPending = false;
        }
      ),
});

export default inventorySlice.reducer;
