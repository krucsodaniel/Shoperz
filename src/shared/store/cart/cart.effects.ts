import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartFacadeService, CartService, ToastService } from '../../services';
import { ICartItem } from '../../models';
import { CartActions } from './cart.actions';
import { catchError, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CartEffects {
  initCart$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.initCart),
      switchMap(() => {
        return this.cartService.getCart()
          .pipe(
            map((cartItems: ICartItem[]) => CartActions.cartInitialized({ cartItems })),
            catchError((error) => of(CartActions.errorCart({ error })))
          );
      })
    )
  );

  addToCart$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.addProductToCart),
      switchMap((action) => {
        return this.cartService.addProductToCart(action.id, action.amount)
          .pipe(
            map((cartItem: ICartItem) => CartActions.productAddedToCart({ cartItem })),
            tap(() => this.toastService.showSuccessToast(this.translate.instant('cart.productAddedToCart'))),
            catchError((error) => {
              this.toastService.showWarningToast(this.translate.instant('cart.productIsAlreadyInCart'));
              return of(CartActions.errorCart({ error }));
            })
          );
      })
    )
  );

  updateAmount$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.updateProductAmount),
      switchMap((action) => {
        return this.cartService.updateCart(action.id, action.amount)
          .pipe(
            map((cartItem: ICartItem) => CartActions.productAmountUpdated({ cartItem })),
            catchError((error) => of(CartActions.errorCart({ error })))
          );
      })
    )
  );

  removeItemFromCart$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.removeProductFromCart),
      switchMap((action) => {
        const id = action.id;

        return this.cartService.removeProductFromCartById(id)
          .pipe(
            map(() => CartActions.productRemovedFromCart({ id })),
            tap(() => this.toastService.showErrorToast(this.translate.instant('cart.productRemovedFromCart'))),
            catchError((error) => of(CartActions.errorCart({ error })))
          );
      })
    )
  );

  removeOrderedItemFromCart$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      switchMap(() => this.cartFacadeService.getCart().pipe(take(1))),
      switchMap((cart: ICartItem[]) => {
        const ids = cart.map((cart: ICartItem) => cart.id);

        return this.cartService.clearCart(ids)
          .pipe(
            map(() => CartActions.cartCleared()),
            catchError((error) => of(CartActions.errorCart({ error })))
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private toastService: ToastService,
    private translate: TranslateService,
    private cartFacadeService: CartFacadeService,
  ) {}
}
