import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WishlistActions } from '../../store/wishlist';

@Injectable()
export class WishlistFacadeService {
  constructor(private store: Store) {}

  createNewWishlistItem(id: number): void {
    this.store.dispatch(WishlistActions.createWishlist({ productId: id }));
  }
}
