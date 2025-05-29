import {
  type FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import type { ICategory } from './model';

export const categoryConverter: FirestoreDataConverter<ICategory> = {
  toFirestore: (item: ICategory) => {
    const { id, ...rest } = item;
    return rest;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): ICategory => {
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as ICategory;
  },
};
