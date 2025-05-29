import { db } from '@/lib/firebsae';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
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

export const addInventoryItem = createAsyncThunk(
  'inventory/add',
  async (item: Omit<IItem, 'id'>, { rejectWithValue }) => {
    try {
      const existingQuery = query(
        collection(db, 'inventory').withConverter(itemConverter),
        where('sku', '==', item.sku),
        where('location', '==', item.location)
      );
      const existingSnapshot = await getDocs(existingQuery);

      if (!existingSnapshot.empty) {
        return rejectWithValue(
          `Item with the same SKU and location already exists.`
        );
      }
      const newDocRef = await addDoc(
        collection(db, 'inventory').withConverter(itemConverter),
        item
      );
      const newItemSnap = await getDoc(newDocRef.withConverter(itemConverter));

      return newItemSnap.data();
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);

export const updateInventoryItem = createAsyncThunk(
  'inventory/update',
  async (item: IItem, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = item;
      if (!id) return rejectWithValue('Unable to access item identifier.');

      const ref = doc(db, 'inventory', item.id as string);
      await updateDoc(ref, updateData);
      const updatedDoc = await getDoc(ref);

      return updatedDoc.data();
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);

export const removeInventoryItem = createAsyncThunk(
  'inventory/remove',
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      if (!id) return rejectWithValue('Unable to access item identifier.');

      const ref = doc(db, 'inventory', id).withConverter(itemConverter);
      await deleteDoc(ref);
      return id;
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);
