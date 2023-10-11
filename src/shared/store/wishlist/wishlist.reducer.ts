import { createReducer, on } from '@ngrx/store';
import { IWishlistItem } from '../../models';
import { WishlistActions } from './wishlist.actions';

export const wishlistFeatureKey = 'wishlist';

export interface IWishlistState {
  wishlist: IWishlistItem[];
  error: Error;
}

export const initialState: IWishlistState = {
  wishlist: undefined,
  error: undefined,
}

export const wishlistReducer = createReducer(
  initialState,
  on(WishlistActions.wishlistCreated, (state, action) => ({
    ...state,
    wishlist: [...(state.wishlist || []), action.wishlistProduct],
  })),
)
