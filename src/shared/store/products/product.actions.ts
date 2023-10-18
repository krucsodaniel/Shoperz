import { createAction, props } from '@ngrx/store';
import { IProduct } from '@shared-module';

export const enum ProductAction {
  loadProducts = '[Products] Load products',
  productsLoaded = '[Products] Products loaded',
  loadProductById = '[Products] Load product by Id',
  productByIdLoaded = '[Products] Product by Id loaded',
  errorProduct = '[Products] Error during process',
}

export namespace ProductActions {
  export const loadProducts = createAction(ProductAction.loadProducts);

  export const productsLoaded = createAction(ProductAction.productsLoaded, props<{ products: IProduct[] }>());

  export const loadProductById = createAction(ProductAction.loadProductById, props<{ productId: string }>());

  export const productByIdLoaded = createAction(ProductAction.productByIdLoaded, props<{ product: IProduct }>());

  export const errorProduct = createAction(ProductAction.errorProduct, props<{ error: Error }>());
}

