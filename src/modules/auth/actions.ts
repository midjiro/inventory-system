import { auth } from '@/lib/firebsae';
import { getErrorMessage } from '@/lib/utils';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  applyActionCode,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
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
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);

export const loginFromCache = createAsyncThunk(
  'user/login-cached',
  async (user: User | null, { rejectWithValue }) => {
    try {
      if (!user) return null;

      await user.getIdToken();
      await user.reload();

      return user;
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
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
      await sendEmailVerification(credentials.user);

      return auth.currentUser;
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);
export const verify = createAsyncThunk(
  'user/verify',
  async (code: string, { rejectWithValue }) => {
    try {
      await applyActionCode(auth, code);
      await auth.currentUser?.reload();
      return auth.currentUser;
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);
export const sendVerificationEmail = async () => {
  try {
    if (auth.currentUser) await sendEmailVerification(auth.currentUser);
  } catch (error) {
    const msg =
      error instanceof FirebaseError
        ? getErrorMessage(error)
        : 'We encountered an unexpected error. Contact us.';

    return msg;
  }
};

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await auth.signOut();
    } catch (error) {
      const msg =
        error instanceof FirebaseError
          ? getErrorMessage(error)
          : 'We encountered an unexpected error. Contact us.';

      return rejectWithValue(msg);
    }
  }
);
