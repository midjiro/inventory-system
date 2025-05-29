import {
  createSlice,
  isPending,
  isRejected,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { type ICategory } from '../model';
import {
  addCategory,
  removeCategory,
  fetchCategories,
  updateCategory,
} from './actions';

interface CategoryState {
  items: ICategory[];
  isPending: boolean;
}

const initialState: CategoryState = {
  items: [],
  isPending: false,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        fetchCategories.fulfilled,
        (state, action: PayloadAction<ICategory[]>) => {
          state.isPending = false;
          state.items = action.payload;
        }
      )
      .addCase(
        addCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.isPending = false;
          state.items.push(action.payload);
        }
      )
      .addCase(
        updateCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.isPending = false;
          const index = state.items.findIndex(
            category => category.id === action.payload.id
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        }
      )
      .addCase(
        removeCategory.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.isPending = false;
          state.items = state.items.filter(cat => cat.id !== action.payload);
        }
      )
      .addMatcher(
        isPending(fetchCategories, addCategory, updateCategory, removeCategory),
        state => {
          state.isPending = true;
        }
      )
      .addMatcher(
        isRejected(
          fetchCategories,
          addCategory,
          updateCategory,
          removeCategory
        ),
        state => {
          state.isPending = false;
        }
      );
  },
});

export default categorySlice.reducer;
