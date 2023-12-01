import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WishlistActions } from '../../store/wishlist';
import { IProduct } from '../../models';
import { ProductSelectors } from '../../store';
import { Observable } from 'rxjs';

@Injectable()
export class WishlistFacadeService {
  constructor(private store: Store) {}

  getWishlist(): Observable<IProduct[]> {
    return this.store.select(ProductSelectors.productsOnWishlist);
  }

  addToWishlist(id: string): void {
    this.store.dispatch(WishlistActions.toggleProductOnWishlist({ productId: id }));
  }
}
