import { IProduct, ICategory, IBrand } from './index';

export interface ICalculatedProduct extends IProduct {
  categoryName: ICategory['name'];
  brandName: IBrand['name'];
}
