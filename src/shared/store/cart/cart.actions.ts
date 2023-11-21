import { createAction, props } from '@ngrx/store';
import { ICartItem } from '../../models';

export const enum CartAction {
  initCart = '[Cart] Initialize cart',
  cartInitialized = '[Cart] Cart initialized',
  addProductToCart = '[Cart] Add product to cart',
  productAddedToCart = '[Cart] Product added to cart',
  updateProductAmount = '[Cart] Update product amount',
  productAmountUpdated = '[Cart] Product amount updated',
  removeProductFromCart = '[Cart] Remove product from cart',
  productRemovedFromCart = '[Cart] Product removed from cart',
  clearCart = '[Cart] Clear cart',
  cartCleared = '[Cart] Cart cleared',
  errorCart = '[Cart] Error during process',
}

export namespace CartActions {
  export const initCart = createAction(CartAction.initCart);

  export const cartInitialized = createAction(CartAction.cartInitialized, props<({ cartItems: ICartItem[] })>());

  export const addProductToCart = createAction(CartAction.addProductToCart, props<{ id: string, amount: number }>());

  export const productAddedToCart = createAction(CartAction.productAddedToCart, props<{ cartItem: ICartItem }>());

  export const updateProductAmount = createAction(CartAction.updateProductAmount, props<{ id: string, amount: number }>());

  export const productAmountUpdated = createAction(CartAction.productAmountUpdated, props<{ cartItem: ICartItem }>());

  export const removeProductFromCart = createAction(CartAction.removeProductFromCart, props<{ id: string }>());

  export const productRemovedFromCart = createAction(CartAction.productRemovedFromCart, props<{ id: string }>());

  export const clearCart = createAction(CartAction.clearCart);

  export const cartCleared = createAction(CartAction.cartCleared);

  export const errorCart = createAction(CartAction.errorCart, props<{ error: Error }>());
}
