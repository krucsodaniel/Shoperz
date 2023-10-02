import { ICartItem } from '../models';
import { OrderStatus } from '../enums';

export interface IOrder {
  id?: number,
  products: ICartItem[],
  totalAmount: number,
  status: OrderStatus,
  orderDate: number,
}
