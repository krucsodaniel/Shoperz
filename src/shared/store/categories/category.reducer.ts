import { createReducer, on } from '@ngrx/store';
import { ICategory } from '../../models';
import { CategoryActions } from './category.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const categoriesFeatureKey = 'categories';

export interface ICategoryState {
  categories: EntityState<ICategory>;
  error?: Error;
}

export const categoryAdapter: EntityAdapter<ICategory> = createEntityAdapter<ICategory>({
  selectId: (category: ICategory) => category.id,
});

export const initialState: ICategoryState = {
  categories: categoryAdapter.getInitialState({}),
  error: undefined,
}

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.categoriesLoaded, (state, { categories }) => {
    return {
      ...state,
      categories: categoryAdapter.addMany(categories, state.categories),
    };
  }),
  on(CategoryActions.errorCategories, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
);
