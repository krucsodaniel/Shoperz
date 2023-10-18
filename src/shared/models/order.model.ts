import { ICartItem } from '../models';
import { OrderStatus } from '../enums';

export interface IOrder {
  id?: string,
  products: ICartItem[],
  totalAmount: number,
  status: OrderStatus,
  timestamp?: { seconds: number, nanoseconds: number },
}
