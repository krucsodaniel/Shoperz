import { IProductState, productsFeatureKey } from './product.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BrandSelectors } from '../brands';
import { CategorySelectors } from '../categories';
import { IBrand, ICalculatedProduct, ICategory, IProduct } from '../../models';

export namespace ProductSelectors {
  export const selectProductFeature = createFeatureSelector<IProductState>(productsFeatureKey);

  export const selectProducts = createSelector(
    selectProductFeature,
    (state: IProductState) => state.products,
  );

  export const selectProductById = (productId: string) => createSelector(
    selectProductFeature,
    (state: IProductState) => state.products.find((product) => product.id === productId),
  );

  export const selectProductsByIds = (productIds: string[]) => createSelector(
    selectProductFeature,
    (state: IProductState) => state.products.filter((product) => productIds.includes(product.id)),
  );

  export const selectAreAllInitialized = createSelector(
    selectProductFeature,
    (state: IProductState) => state.isProductsPageInitialized,
  );

  export const selectIsSpecificInitialized = createSelector(
    selectProductFeature,
    (state: IProductState) => state.isSpecificProductPageInitialized,
  );

  export const getCalculatedProduct = (productId: string) => createSelector(
    selectProductById(productId),
    BrandSelectors.selectBrands,
    CategorySelectors.selectCategories,
    (product, brands, categories) => {
      if (!product || !brands || !categories) {
        return undefined;
      }

      return calculateProduct(product, categories, brands);
    }
  );

  export const getCalculatedProducts = createSelector(
    selectProducts,
    BrandSelectors.selectBrands,
    CategorySelectors.selectCategories,
    (products, brands, categories) => {
      if (!products || !brands || !categories) {
        return undefined;
      }

      return products.map((product: IProduct) => calculateProduct(product, categories, brands));
    }
  );

  export function calculateProduct(product: IProduct, categories: ICategory[], brands: IBrand[]): ICalculatedProduct {
    const category = categories.find((category) => category.id === product.categoryId);
    const brand = brands.find((brand) => brand.id === product.brandId);

    return {
      ...product,
      categoryName: category.name,
      brandName: brand.name,
    };
  }
}
