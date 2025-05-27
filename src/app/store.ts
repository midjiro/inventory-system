import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/modules/auth';
import { inventoryReducer } from '@/modules/inventory';

const reducer = combineReducers({
  userReducer,
  inventoryReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
