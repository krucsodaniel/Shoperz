import { createAction, props } from '@ngrx/store';
import { IOrder } from '../../models';

export const enum OrdersAction {
  initOrders = '[Orders] Initialize orders',
  ordersInitialized = '[Orders] Orders initialized',
  createOrder = '[Orders] Create order',
  orderCreated = '[Orders] Order created',
  errorOrders = '[Orders] Error during process',
}

export namespace OrdersActions {
  export const initOrders = createAction(OrdersAction.initOrders);

  export const ordersInitialized = createAction(OrdersAction.ordersInitialized, props<({ orders: IOrder[] })>());

  export const createOrder = createAction(OrdersAction.createOrder, props<{ order: IOrder }>());

  export const orderCreated = createAction(OrdersAction.orderCreated, props<({ order: IOrder })>());

  export const errorOrders = createAction(OrdersAction.errorOrders, props<({ error: Error })>());
}
