import { IProduct } from './product.model';
import { ICategory } from './category.model';
import { IBrand } from './brand.model';

export interface ICalculatedProduct extends IProduct {
  categoryName: ICategory['name'];
  brandName: IBrand['name'];
}
