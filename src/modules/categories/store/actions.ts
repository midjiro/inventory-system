import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import type { ICategory } from '../model';
import { db } from '@/lib/firebsae';
import { FirebaseError } from 'firebase/app';
import { getErrorMessage } from '@/lib/utils';

const COLLECTION = 'categories';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as ICategory[];
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);

export const createCategory = createAsyncThunk(
  'categories/create',
  async (data: Omit<ICategory, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return { ...data, id: docRef.id } as ICategory;
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'categories/update',
  async ({ id, data }: { id: string; data: Partial<ICategory> }, thunkAPI) => {
    try {
      await updateDoc(doc(db, COLLECTION, id), data);
      return { ...data, id } as ICategory;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id: string, thunkAPI) => {
    try {
      await deleteDoc(doc(db, COLLECTION, id));
      return id;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
