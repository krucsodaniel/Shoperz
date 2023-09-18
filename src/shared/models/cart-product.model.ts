import { ICalculatedProduct } from './calculated-product.model';
import { ICartItem } from './cart-item.model';

export interface ICartProduct extends ICalculatedProduct {
  amount: ICartItem['amount'];
}
