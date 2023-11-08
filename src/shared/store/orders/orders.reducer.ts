import { createReducer, on } from '@ngrx/store';
import { IOrder } from '../../models';
import { OrdersActions } from './orders.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const ordersFeatureKey = 'orders';

export interface IOrdersState {
  orders: EntityState<IOrder>;
  error: Error;
}

export const orderAdapter: EntityAdapter<IOrder> = createEntityAdapter<IOrder>({
  selectId: (order: IOrder) => order.id,
});

export const initialState: IOrdersState = {
  orders: orderAdapter.getInitialState({}),
  error: undefined,
}

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.ordersInitialized, (state, { orders }) => {
    return {
      ...state,
      orders: orderAdapter.addMany(orders, state.orders),
    };
  }),
  on(OrdersActions.orderCreated, (state, { order }) => {
    return {
      ...state,
      orders: orderAdapter.addOne(order, state.orders),
    };
  }),
);
