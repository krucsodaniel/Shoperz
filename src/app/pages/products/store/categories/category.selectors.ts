import { ICategoryState, categoriesFeatureKey } from './category.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export namespace CategorySelectors {
  export const selectCategoryFeature = createFeatureSelector<ICategoryState>(categoriesFeatureKey);

  export const selectCategories = createSelector(
    selectCategoryFeature,
    (state: ICategoryState) => state.categories,
  );
}
