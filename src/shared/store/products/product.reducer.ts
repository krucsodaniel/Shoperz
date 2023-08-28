import { createReducer, on } from '@ngrx/store';
import { IProduct } from '@shared-module';
import { ProductActions } from './product.actions';

export const productsFeatureKey = 'products';

export interface IProductState {
  products: IProduct[];
  isLoading: boolean;
  isExpanded: boolean;
  error: Error;
}

export const initialState: IProductState = {
  products: undefined,
  isLoading: false,
  isExpanded: false,
  error: undefined,
}

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(ProductActions.productsLoaded, (state, action) => ({
    ...state,
    isLoading: false,
    products: action.products,
  })),
  on(ProductActions.errorProduct, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
