import { Timestamp } from 'firebase/firestore';

export interface ICategory {
  id: string;
  name: string;
  description?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
