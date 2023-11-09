import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { OrderActionKey } from '../../enums';
import { OrdersActions } from '../../store';
import { IOrder } from '../../models';
import { ActionTrackerService, OrdersService, ToastService } from '../../services';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class OrdersEffects {
  initOrders$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(OrdersActions.initOrders),
      switchMap(() => {
        return this.ordersService.getOrders()
          .pipe(
            map((orders: IOrder[]) => OrdersActions.ordersInitialized({ orders })),
            tap(() => this.actionTrackerService.sendAction(OrderActionKey.loadOrders)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(OrderActionKey.loadOrders, error);
              return EMPTY;
            }),
          );
      }),
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
            tap(() => this.actionTrackerService.sendAction(OrderActionKey.addOrder)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(OrderActionKey.addOrder, error);
              return EMPTY;
            }),
          );
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private toastService: ToastService,
    private translate: TranslateService,
    private actionTrackerService: ActionTrackerService,
  ) {}
}
