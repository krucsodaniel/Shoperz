import { createAction, props } from '@ngrx/store';
import { IWishlistItem } from '../../models';

export const enum WishlistAction {
  createWishlist = '[Wishlist] Create wishlist',
  wishlistCreated = '[Wishlist] Feedback wishlist',
  errorWishlist = '[Wishlist] Error during wishlist',
}

export namespace WishlistActions {
  export const createWishlist = createAction(WishlistAction.createWishlist, props<{ productId: number }>());

  export const wishlistCreated = createAction(WishlistAction.wishlistCreated, props<{ wishlistProduct: IWishlistItem }>());

  export const errorWishlist = createAction(WishlistAction.errorWishlist, props<{ error: Error }>());
}
