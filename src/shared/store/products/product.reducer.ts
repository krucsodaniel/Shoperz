import { createReducer, on } from '@ngrx/store';
import { IProduct } from '@shared-module';
import { ProductActions } from './product.actions';

export const productsFeatureKey = 'products';

export interface IProductState {
  products: IProduct[];
  isLoading: boolean;
  isExpanded: boolean;
  areAllInitialized: boolean;
  isSpecificInitialized: boolean;
  error: Error;
}

export const initialState: IProductState = {
  products: undefined,
  isLoading: false,
  isExpanded: false,
  areAllInitialized: false,
  isSpecificInitialized: false,
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
    areAllInitialized: true,
    isSpecificInitialized: false,
  })),
  on(ProductActions.productByIdLoaded, (state, action) => ({
    ...state,
    products: [...(state.products || []), action.product],
    isSpecificInitialized: true,
  })),
  on(ProductActions.errorProduct, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
