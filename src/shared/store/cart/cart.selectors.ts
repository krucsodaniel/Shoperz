import { ICartState, cartFeatureKey } from './cart.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductSelectors } from '../products';
import { IBrand, ICalculatedProduct, ICartItem, ICartProduct, ICategory } from '../../models';
import { BrandSelectors } from '../brands';
import { CategorySelectors } from '../categories';

export namespace CartSelectors {
  export const selectCartFeature = createFeatureSelector<ICartState>(cartFeatureKey);

  export const selectCart = createSelector(
    selectCartFeature,
    (state: ICartState) => state.cart,
  );

  export const selectTotalCartAmount = createSelector(
    selectCart,
    (cart: ICartItem[]) => {
      if (!cart?.length) {
        return 0;
      }

      return cart.reduce((totalAmount, cartItem) => totalAmount + (cartItem.amount || 0), 0);
    }
  );

  export const selectTotalAmountOfPrice = createSelector(
    selectCart,
    ProductSelectors.getCalculatedProducts,
    (cart: ICartItem[], products: ICalculatedProduct[]) => {
      if (!cart || cart.length === 0 || !products) {
        return 0;
      }

      return cart.reduce((totalAmount, cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);

        if (product) {
          return totalAmount + product.price * cartItem.amount;
        }

        return totalAmount;
      }, 0);
    }
  );

  export const selectCartProducts = createSelector(
    selectCart,
    ProductSelectors.getCalculatedProducts,
    BrandSelectors.selectBrands,
    CategorySelectors.selectCategories,
    (cart: ICartItem[], products: ICalculatedProduct[], brands: IBrand[], categories: ICategory[]) => {
      if (!products || !cart || !brands || !categories) {
        return undefined;
      }

      return cart.map(({ id, amount }) => {
        const cartProduct: ICartProduct = {
          ...products.find((product: ICalculatedProduct) => product.id === id),
          amount
        };

        return ProductSelectors.calculateProduct(cartProduct, categories, brands);
      });
    },
  );

  export const isProductInCart = (productId: string) => createSelector(
    selectCart,
    (cart: ICartItem[]) => {
      if (!cart?.length) {
        return null;
      }

      return cart.some((item: ICartItem) => item.id === productId)
    }
  );

  export const selectAmountOfCurrentCartItem = (productId: string) => createSelector(
    selectCart,
    (cart: ICartItem[]) => {
      if (!cart?.length) {
        return null;
      }

      const currentItem = cart.find((cartItem: ICartItem) => cartItem.id === productId);

      return currentItem.amount;
    }
  );
}
