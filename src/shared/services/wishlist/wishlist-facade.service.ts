import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';

import { IWishlistItem } from '../../models';
import { WishlistActions } from '../../store/wishlist';
import { WishlistSelectors } from '../../store/wishlist/wishlist.selectors';

@Injectable()
export class WishlistFacadeService {
  constructor(private store: Store) {}

  getAllItemsOnWishlist(): Observable<IWishlistItem[]> {
    return this.store.select(WishlistSelectors.selectWishlist)              // to filter out falsy values like null or undefined
  }

  createNewWishlistItem(id: number): void {
    this.store.dispatch(WishlistActions.createWishlist({ productId: id }));
  }
}
