import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IProduct } from '../../models';
import { ProductActions, ProductSelectors } from '../../store';
import { Observable } from 'rxjs';
import { ActionDispatcherService } from '../action-dispatcher.service';
import { ProductActionKey } from '../../enums';

@Injectable()
export class WishlistFacadeService {
  constructor(private store: Store, private actionDispatcherService: ActionDispatcherService,) {}

  getWishlist(): Observable<IProduct[]> {
    return this.store.select(ProductSelectors.productsOnWishlist);
  }

  async toggleOnWishlist(productId: string, isOnWishlist: boolean): Promise<void>  {
    return await this.actionDispatcherService.dispatchAsync(
      ProductActions.toggleProductOnWishlist({ productId, isOnWishlist }),
      ProductActionKey.toggleOnWishlist,
    );
  }
}
