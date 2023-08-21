import { IProductState, productsFeatureKey } from './product.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { BrandSelectors } from '../brands';
import { CategorySelectors } from '../categories';
import { IProduct } from 'src/shared/models';

export namespace ProductSelectors {
  export const selectProductFeature = createFeatureSelector<IProductState>(productsFeatureKey);

  export const selectProducts = createSelector(
    selectProductFeature,
    (state: IProductState) => state.products,
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

  export const selectIsLoading = createSelector(
    selectProductFeature,
    (state: IProductState) => state.isLoading
  );
}
