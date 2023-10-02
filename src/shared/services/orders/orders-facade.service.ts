import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersActions, OrdersSelectors } from '../../store';
import { IOrder } from '../../models';
import { filter, Observable } from 'rxjs';

@Injectable()
export class OrdersFacadeService {
  constructor(private store: Store) {}

  initOrdersState(): void {
    this.store.dispatch(OrdersActions.initOrders());
  }

  createOrder(order: IOrder): void {
    this.store.dispatch(OrdersActions.createOrder({ order }))
  }

  getOrderProducts(): Observable<IOrder[]> {
    return this.store.select(OrdersSelectors.selectOrderProducts)
      .pipe(filter(Boolean));
  }
}
