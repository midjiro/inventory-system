import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { ICategory } from '../model';
import { db } from '@/lib/firebsae';
import { FirebaseError } from 'firebase/app';
import { getErrorMessage } from '@/lib/utils';
import { categoryConverter } from '../converter';

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const ref = collection(db, 'categories').withConverter(categoryConverter);
      const snapshot = await getDocs(ref);
      return snapshot.docs.map(doc => doc.data()) as ICategory[];
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);

export const addCategory = createAsyncThunk(
  'categories/add',
  async (data: Omit<ICategory, 'id' | 'createdAt'>, { rejectWithValue }) => {
    try {
      const q = query(
        collection(db, 'categories'),
        where('name', '==', data.name)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return rejectWithValue('Category with this name already exists.');
      }

      const docRef = await addDoc(collection(db, 'categories'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      const newDoc = await getDoc(docRef.withConverter(categoryConverter));

      return newDoc.data() as ICategory;
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
  async (item: ICategory, { rejectWithValue }) => {
    try {
      const { id, ...updateData } = item;
      if (!id) return rejectWithValue('Unable to access item identifier.');

      const ref = doc(db, 'categories', id);
      await updateDoc(ref, updateData);
      const updatedDoc = await getDoc(ref);

      return { id: updatedDoc.id, ...updatedDoc.data() } as ICategory;
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);

export const removeCategory = createAsyncThunk(
  'categories/remove',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
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
