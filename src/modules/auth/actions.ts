import { auth } from '@/lib/firebsae';
import { getErrorMessage } from '@/lib/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export const login = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return credentials.user;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
export const register = createAsyncThunk(
  'user/register',
  async (
    {
      name,
      email,
      password,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(credentials.user, { displayName: name });

      return auth.currentUser;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(getErrorMessage(error));
      }
    }
  }
);
