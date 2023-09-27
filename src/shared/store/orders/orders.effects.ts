import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { IOrder, OrdersActions, OrdersService, ToastService } from '@shared-module';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class OrdersEffects {
  initOrders$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrders),
      switchMap(() => {
        return this.ordersService.getOrders()
          .pipe(
            map((orders: IOrder[]) => OrdersActions.ordersInitialized({ orders })),
            catchError((error) => of(OrdersActions.errorOrders({ error })))
          );
      })
    )
  );

  createOrder$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(OrdersActions.createOrder),
      switchMap((action) => {
        return this.ordersService.createOrder(action.order)
          .pipe(
            map((order: IOrder) => OrdersActions.orderCreated({ order })),
            tap(() => this.toastService.showSuccessToast(this.translate.instant('orders.orderCreated'))),
            catchError((error) => of(OrdersActions.errorOrders({ error }))),
          );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private toastService: ToastService,
    private translate: TranslateService,
  ) {}
}
