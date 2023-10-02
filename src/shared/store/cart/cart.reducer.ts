import { createReducer, on } from '@ngrx/store';
import { ICartItem } from '../../models';
import { CartActions } from './cart.actions';

export const cartFeatureKey = 'cart';

export interface ICartState {
  cart: ICartItem[];
  error: Error;
}

export const initialState: ICartState = {
  cart: undefined,
  error: undefined,
}

export const cartReducer = createReducer(
  initialState,
  on(CartActions.cartInitialized, (state, action) => ({
    ...state,
    cart: action.cartItems,
  })),
  on(CartActions.productAddedToCart, (state, action) => ({
    ...state,
    cart: [...(state.cart || []), action.cartItem],
  })),
  on(CartActions.productAmountUpdated, (state, action) => {
    const itemIndex = state.cart.findIndex((item) => item.id === action.cartItem.id);

    if (itemIndex === -1) {
      return state;
    }

    const updatedCart = [...state.cart];
    updatedCart[itemIndex] = action.cartItem;

    return {
      ...state,
      cart: updatedCart,
    };
  }),
  on(CartActions.productRemovedFromCart, (state, action) => {
    const updatedCart = state.cart.filter((item) => item.id !== action.id);

    return {
      ...state,
      cart: updatedCart,
    };
  }),
  on(CartActions.cartCleared, (state) => {
    return {
      ...state,
      cart: [],
    };
  }),
);

