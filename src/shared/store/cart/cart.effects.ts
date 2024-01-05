import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, CartFacadeService, CartService, ToastService } from '../../services';
import { ICartItem } from '../../models';
import { CartActions } from './cart.actions';
import { catchError, EMPTY, map, Observable, switchMap, take, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { CartActionKey } from '../../enums';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CartEffects {
  initCart$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.initCart),
      switchMap(() => {
        return this.cartService.getCart()
          .pipe(
            map((cartItems: ICartItem[]) => CartActions.cartInitialized({ cartItems })),
            tap(() => this.actionTrackerService.sendAction(CartActionKey.loadCart)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(CartActionKey.loadCart, error);
              return EMPTY;
            }),
          );
      }),
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
            tap(() => this.actionTrackerService.sendAction(CartActionKey.addCartItem)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(CartActionKey.addCartItem, error);
              return EMPTY;
            }),
          );
      }),
    )
  );

  updateAmount$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.updateProductAmount),
      switchMap((action) => {
        return this.cartService.updateCart(action.id, action.amount)
          .pipe(
            map((cartItem: ICartItem) => CartActions.productAmountUpdated({ cartItem })),
            tap(() => this.actionTrackerService.sendAction(CartActionKey.updateCartItem)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(CartActionKey.updateCartItem, error);
              return EMPTY;
            }),
          );
      }),
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
            tap(() => this.actionTrackerService.sendAction(CartActionKey.deleteCartItem)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(CartActionKey.deleteCartItem, error);
              return EMPTY;
            }),
          );
      }),
    )
  );

  clearCart$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      switchMap(() => this.cartFacadeService.getCart().pipe(take(1))),
      switchMap((cart: ICartItem[]) => {
        const ids = cart.map((cart: ICartItem) => cart.id);

        return this.cartService.clearCart(ids)
          .pipe(
            map(() => CartActions.cartCleared()),
            tap(() => this.actionTrackerService.sendAction(CartActionKey.clearCart)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(CartActionKey.clearCart, error);
              return EMPTY;
            }),
          );
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private cartService: CartService,
    private toastService: ToastService,
    private translate: TranslateService,
    private cartFacadeService: CartFacadeService,
    private actionTrackerService: ActionTrackerService,
  ) {}
}
