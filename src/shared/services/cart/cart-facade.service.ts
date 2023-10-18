import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartActions } from '../../store/cart/cart.actions';
import { filter, Observable } from 'rxjs';
import { ICalculatedProduct, ICartItem } from '../../models';
import { CartSelectors } from '../../store/cart/cart.selectors';

@Injectable()
export class CartFacadeService {
  constructor(private store: Store) {}

  initCartState(): void {
    this.store.dispatch(CartActions.initCart());
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

  checkIfProductIsInCart(productId: string): Observable<boolean> {
    return this.store.select(CartSelectors.isProductInCart(productId))
      .pipe(filter(Boolean));
  }

  getCurrentCartItemAmount(productId: string): Observable<number> {
    return this.store.select(CartSelectors.selectAmountOfCurrentCartItem(productId))
      .pipe(filter(Boolean));
  }

  addProductToCart(id: string, amount: number): void {
    this.store.dispatch(CartActions.addProductToCart({ id, amount }));
  }

  updateProductAmount(id: string, amount: number): void {
    this.store.dispatch(CartActions.updateProductAmount({ id, amount }));
  }

  removeProductFromCart(id: string): void {
    this.store.dispatch(CartActions.removeProductFromCart({ id }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }
}
