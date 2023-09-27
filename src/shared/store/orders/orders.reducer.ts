import { createReducer, on } from '@ngrx/store';
import { IOrder } from '../../models';
import { OrdersActions } from './orders.actions';

export const ordersFeatureKey = 'orders';

export interface IOrdersState {
  orders: IOrder[],
  error: Error;
}

export const initialState: IOrdersState = {
  orders: undefined,
  error: undefined,
}

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.ordersInitialized, (state, action) => ({
    ...state,
    orders: action.orders,
  })),
  on(OrdersActions.orderCreated, (state, action) => ({
    ...state,
    orders: [...(state.orders || []), action.order],
  })),
);
