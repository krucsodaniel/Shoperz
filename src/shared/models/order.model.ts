import { ICartItem } from '../models';
import { OrderStatus } from '../enums';
import { FirestoreTimestampType } from '../types';

export interface IOrder {
  id?: string,
  products: ICartItem[],
  totalAmount: number,
  status: OrderStatus,
  timestamp?: FirestoreTimestampType,
}
