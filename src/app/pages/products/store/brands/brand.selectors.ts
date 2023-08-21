import { IBrandState, brandsFeatureKey } from './brand.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export namespace BrandSelectors {
  export const selectBrandFeature = createFeatureSelector<IBrandState>(brandsFeatureKey);

  export const selectBrands = createSelector(
    selectBrandFeature,
    (state: IBrandState) => state.brands,
  )
}
