import { IOrdersState, ordersFeatureKey } from './orders.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductSelectors } from '../products';
import { BrandSelectors } from '../brands';
import { CategorySelectors } from '../categories';
import { IBrand, ICalculatedProduct, ICartItem, ICategory, IOrder } from '../../models';

export namespace OrdersSelectors {
  export const selectOrdersFeature = createFeatureSelector<IOrdersState>(ordersFeatureKey);

  export const selectOrders = createSelector(
    selectOrdersFeature,
    (state: IOrdersState) => {
      if (!Object.values(state.orders.entities).length) {
        return undefined;
      }

      return Object.values(state.orders.entities);
    },
  );

  export const selectOrderProducts = createSelector(
    selectOrders,
    ProductSelectors.getCalculatedProducts,
    BrandSelectors.selectBrands,
    CategorySelectors.selectCategories,
    (orders: IOrder[], products: ICalculatedProduct[], brands: IBrand[], categories: ICategory[]) => {
      if (!products || !orders || !brands || !categories) {
        return undefined;
      }

      return orders.map((order: IOrder) => {
        const orderProducts: ICartItem[] = order.products.map((cartProduct: ICartItem) => {
          const orderProduct = products.find((product: ICalculatedProduct) => product.id === cartProduct.id);

          return {
            ...cartProduct,
            image: orderProduct ? orderProduct.images[0] : '',
            productName: orderProduct ? orderProduct.name : '',
          };
        });

        return {
          ...order,
          products: orderProducts,
        };
      });
    }
  );
}
