import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IWishlistState, wishlistFeatureKey } from './wishlist.reducer';


export namespace WishlistSelectors {
  export const selectWishlistFeature = createFeatureSelector<IWishlistState>(wishlistFeatureKey);

  export const selectWishlist = createSelector(
    selectWishlistFeature,
    (state: IWishlistState) => state.wishlist,
  );

}
