import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../models';
import { ProductActions } from './product.actions';
import { createEntityAdapter, EntityAdapter, EntityState, Update } from '@ngrx/entity';

export const productsFeatureKey = 'products';

export interface IProductState {
  products: EntityState<IProduct>;
  isLoading: boolean;
  isExpanded: boolean;
  isProductsPageInitialized: boolean;
  isSpecificProductPageInitialized: boolean;
  error: Error;
}

export const productAdapter: EntityAdapter<IProduct> = createEntityAdapter<IProduct>({
  selectId: (product: IProduct) => product.id,
});

export const initialState: IProductState = {
  products: productAdapter.getInitialState({}),
  isLoading: false,
  isExpanded: false,
  isProductsPageInitialized: false,
  isSpecificProductPageInitialized: false,
  error: undefined,
}

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductActions.productsLoaded, (state, { products }) => {
    return {
      ...state,
      isLoading: false,
      products: productAdapter.addMany(products, state.products),
      isProductsPageInitialized: true,
      isSpecificProductPageInitialized: false,
    };
  }),
  on(ProductActions.productByIdLoaded, (state, { product }) => {
    return {
      ...state,
      products: productAdapter.addOne(product, state.products),
      isSpecificProductPageInitialized: true,
    };
  }),
  on(ProductActions.toggleProductOnWishlist, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductActions.productToggledToWishlist, (state, { productId, isOnWishlist }) => {
    const updatedProduct: Update<IProduct> = {
      id: productId,
      changes: {
        isOnWishlist: isOnWishlist,
      },
    };
    return {
      ...state,
      isLoading: false,
      products: productAdapter.updateOne(updatedProduct, state.products),
    };
  }),
  on(
    ProductActions.errorProduct,
    (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
);
