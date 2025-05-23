import { errorMessages } from '@/contants/errors-messages';
import { clsx, type ClassValue } from 'clsx';
import { FirebaseError } from 'firebase/app';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: any | unknown | FirebaseError) => {
  if (error instanceof FirebaseError && errorMessages[error.code]) {
    return errorMessages[error.code];
  }

  return 'Unable to perform your action. We are on the way to fix it';
};
