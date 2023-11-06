import { IBrandState, brandsFeatureKey } from './brand.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export namespace BrandSelectors {
  export const selectBrandFeature = createFeatureSelector<IBrandState>(brandsFeatureKey);

  export const selectBrands = createSelector(
    selectBrandFeature,
    (state: IBrandState) => {
      if (!Object.values(state.brands.entities).length) {
        return undefined;
      }

      return Object.values(state.brands.entities);
    },
  )
}
