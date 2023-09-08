import { IProductState, productsFeatureKey } from './product.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BrandSelectors } from '../brands';
import { CategorySelectors } from '../categories';
import { IProduct } from '@shared-module';

export namespace ProductSelectors {
  export const selectProductFeature = createFeatureSelector<IProductState>(productsFeatureKey);

  export const selectProducts = createSelector(
    selectProductFeature,
    (state: IProductState) => state.products,
  );

  export const selectProductById = (productId: number) => createSelector(
    selectProductFeature,
    (state: IProductState) => state.products.find((product) => product.id === productId),
  );

  export const selectAreAllInitialized = createSelector(
    selectProductFeature,
    (state: IProductState) => state.areAllInitialized,
  );

  export const selectIsSpecificInitialized = createSelector(
    selectProductFeature,
    (state: IProductState) => state.isSpecificInitialized,
  );

  export const getCalculatedProduct = (productId: number) => createSelector(
    selectProductById(productId),
    BrandSelectors.selectBrands,
    CategorySelectors.selectCategories,
    (product, brands, categories) => {
      if (!product || !brands || !categories) {
        return undefined;
      }

      const category = categories.find((category) => category.id === product.categoryId);
      const brand = brands.find((brand) => brand.id === product.brandId);

      return {
        ...product,
        categoryName: category.name,
        brandName: brand.name,
      };
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

      return products.map((product: IProduct) => {
        const category = categories.find((category) => category.id === product.categoryId);
        const brand = brands.find((brand) => brand.id === product.brandId);

        return {
          ...product,
          categoryName: category.name,
          brandName: brand.name,
        };
      });
    }
  );
}
