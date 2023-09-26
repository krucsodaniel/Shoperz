import { ICartItem } from '../models';
import { OrderStatus } from '../enums';

export interface IOrder {
  orderId: string;
  products: ICartItem[],
  totalAmount: number,
  status: OrderStatus,
  orderDate: Date,
}
