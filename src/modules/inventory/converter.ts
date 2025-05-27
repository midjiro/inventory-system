import {
  type FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { type IItem } from './models';

export const itemConverter: FirestoreDataConverter<IItem> = {
  toFirestore: (item: IItem) => {
    const { id, ...rest } = item;
    return rest;
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot): IItem => {
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as IItem;
  },
};
