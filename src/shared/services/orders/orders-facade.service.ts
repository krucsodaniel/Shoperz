import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersActions, OrdersSelectors } from '../../store';
import { IOrder } from '../../models';
import { filter, Observable } from 'rxjs';
import { ActionDispatcherService } from '../action-dispatcher.service';
import { OrderActionEnum } from '../../enums';

@Injectable()
export class OrdersFacadeService {
  constructor(private store: Store, private actionDispatcherService: ActionDispatcherService) {}

  async initOrdersState(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      OrdersActions.initOrders(),
      OrderActionEnum.loadOrders,
    );
  }

  async createOrder(order: IOrder): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      OrdersActions.createOrder({ order }),
      OrderActionEnum.addOrder,
    );
  }

  getOrderProducts(): Observable<IOrder[]> {
    return this.store.select(OrdersSelectors.selectOrderProducts)
      .pipe(filter(Boolean));
  }
}
