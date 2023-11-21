import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import { ICalculatedProduct, ICartItem } from '../../models';
import { CartSelectors, CartActions } from '../../store/';
import { ActionDispatcherService } from '../action-dispatcher.service';
import { CartActionKey } from '../../enums';

@Injectable()
export class CartFacadeService {
  constructor(private store: Store, private actionDispatcherService: ActionDispatcherService) {}

  async initCartState(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      CartActions.initCart(),
      CartActionKey.loadCart,
    )
  }

  async addProductToCart(id: string, amount: number): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      CartActions.addProductToCart({ id, amount }),
      CartActionKey.addCartItem,
    );
  }

  async updateProductAmount(id: string, amount: number): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      CartActions.updateProductAmount({ id, amount }),
      CartActionKey.updateCartItem,
    );
  }

  async removeProductFromCart(id: string): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      CartActions.removeProductFromCart({ id }),
      CartActionKey.deleteCartItem,
    );
  }

  async clearCart(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      CartActions.clearCart(),
      CartActionKey.clearCart,
    );
  }

  getCart(): Observable<ICartItem[]> {
    return this.store.select(CartSelectors.selectCart)
      .pipe(filter(Boolean));
  }

  getCartProducts(): Observable<ICalculatedProduct[]> {
    return this.store.select(CartSelectors.selectCartProducts)
      .pipe(filter(Boolean));
  }

  getTotalAmountOfProductsInCart(): Observable<number> {
    return this.store.select(CartSelectors.selectTotalCartAmount);
  }

  getTotalAmountOfPriceInCart(): Observable<number> {
    return this.store.select(CartSelectors.selectTotalAmountOfPrice);
  }

  checkIfProductIsInCart(id: string): Observable<boolean> {
    return this.store.select(CartSelectors.isProductInCart(id))
      .pipe(filter(Boolean));
  }

  getCurrentCartItemAmount(id: string): Observable<number> {
    return this.store.select(CartSelectors.selectAmountOfCurrentCartItem(id));
  }
}
