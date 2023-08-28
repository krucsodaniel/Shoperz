import { createReducer, on } from '@ngrx/store';
import { ICategory } from '@shared-module';
import { CategoryActions } from './category.actions';

export const categoriesFeatureKey = 'categories';

export interface ICategoryState {
  categories: ICategory[];
  error: Error;
}

export const initialState: ICategoryState = {
  categories: undefined,
  error: undefined,
}

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.categoriesLoaded, (state, action) => ({
    ...state,
    categories: action.categories,
  })),
  on(CategoryActions.errorCategories, (state, action) => ({
    ...state,
    error: action.error,
  })),
);
