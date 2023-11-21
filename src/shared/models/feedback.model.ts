import { FirestoreTimestampType } from '../types';

export interface IFeedback {
  id: string;
  message: string;
  name: string;
  email: string;
  rate: number;
  timestamp?: FirestoreTimestampType;
}
