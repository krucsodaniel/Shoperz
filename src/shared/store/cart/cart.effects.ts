import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService, ICartItem } from '@shared-module';
import { CartActions } from './cart.actions';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';

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
          )
      })
    )
  );

  addToCart$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.addProductToCart),
      switchMap((action) => {
        return this.cartService.addProductToCart(action.id, action.amount)
          .pipe(
            map((cartItem: ICartItem) =>
              CartActions.productAddedToCart({ cartItem })
            ),
            catchError((error) =>
              of(CartActions.errorCart({ error }))
            )
          )
      })
    )
  );

  updateAmount$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.updateProductAmount),
      switchMap((action) => {
        return this.cartService.updateCart(action.id, action.amount)
          .pipe(
            map((cartItem: ICartItem) =>
              CartActions.productAmountUpdated({ cartItem })
            ),
            catchError((error) =>
              of(CartActions.errorCart({ error }))
            )
          )
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
            map(() =>
              CartActions.productRemovedFromCart({ id })
            ),
            catchError((error) =>
              of(CartActions.errorCart({ error }))
            )
          )
      })
    )
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
  ) {}
}
