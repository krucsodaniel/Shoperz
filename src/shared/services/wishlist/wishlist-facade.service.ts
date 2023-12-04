import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from '../../models';
import { ProductActions, ProductSelectors } from '../../store';
import { Observable } from 'rxjs';

@Injectable()
export class WishlistFacadeService {
  constructor(private store: Store) {}

  getWishlist(): Observable<IProduct[]> {
    return this.store.select(ProductSelectors.productsOnWishlist);
  }

  addToWishlist(productId: string, isOnWishlist: boolean): void {
    this.store.dispatch(ProductActions.toggleProductOnWishlist({ productId, isOnWishlist }));
  }
}
