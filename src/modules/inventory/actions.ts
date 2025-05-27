import { db } from '@/lib/firebsae';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { itemConverter } from './converter';
import type { IItem } from './models';
import { FirebaseError } from 'firebase/app';
import { getErrorMessage } from '@/lib/utils';

export const fetchInventory = createAsyncThunk<
  IItem[],
  void,
  { rejectValue: string }
>('inventory/fetch', async (_, { rejectWithValue }) => {
  try {
    const ref = collection(db, 'inventory').withConverter(itemConverter);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    const msg =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : 'We encountered an unexpected error. Contact us.';

    return rejectWithValue(msg);
  }
});
