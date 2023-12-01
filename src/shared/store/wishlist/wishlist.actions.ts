import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../models';

export const enum WishlistAction {
  toggleProductInWishlist = '[Wishlist] Toggle product to wishlist',
  productToggledInWishlist = '[Wishlist] Product toggled to wishlist',
  errorWishlist = '[Wishlist] Error wishlist',
}

export namespace WishlistActions {
  export const toggleProductOnWishlist = createAction(WishlistAction.toggleProductInWishlist, props<{ productId: string }>());

  export const productToggledToWishlist = createAction(WishlistAction.productToggledInWishlist, props<{ product: IProduct }>());

  export const errorWishlist = createAction(WishlistAction.errorWishlist, props<{ error: Error }>());
}
