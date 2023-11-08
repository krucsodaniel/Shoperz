import { createReducer, on } from '@ngrx/store';
import { ICartItem } from '../../models';
import { CartActions } from './cart.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const cartFeatureKey = 'cart';

export interface ICartState {
  cart: EntityState<ICartItem>;
  error: Error;
}

export const cartAdapter: EntityAdapter<ICartItem> = createEntityAdapter<ICartItem>({
  selectId: (cartItem: ICartItem) => cartItem.id,
});

export const initialState: ICartState = {
  cart: cartAdapter.getInitialState({}),
  error: undefined,
}

export const cartReducer = createReducer(
  initialState,
  on(CartActions.cartInitialized, (state, { cartItems }) => {
    return {
      ...state,
      cart: cartAdapter.addMany(cartItems, state.cart),
    };
  }),
  on(CartActions.productAddedToCart, (state, { cartItem }) => {
    return {
      ...state,
      cart: cartAdapter.addOne(cartItem, state.cart),
    };
  }),
  on(CartActions.productAmountUpdated, (state, { cartItem }) => {
    return {
      ...state,
      cart: cartAdapter.updateOne({ id: cartItem.id, changes: cartItem }, state.cart),
    };
  }),
  on(CartActions.productRemovedFromCart, (state, { id }) => {
    return {
      ...state,
      cart: cartAdapter.removeOne(id, state.cart),
    };
  }),
  on(CartActions.cartCleared, (state) => {
    return {
      ...state,
      cart: cartAdapter.removeAll(state.cart),
    };
  }),
);

