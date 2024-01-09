import { createAction, props } from '@ngrx/store';
import { ICategory } from '../../models';

const enum CategoryAction {
  loadCategories = '[Categories] Load categories',
  categoriesLoaded = '[Categories] Categories loaded',
  errorCategories = '[Categories] Error categories',
}

export namespace CategoryActions {
  export const loadCategories = createAction(CategoryAction.loadCategories);

  export const categoriesLoaded = createAction(CategoryAction.categoriesLoaded, props<{ categories: ICategory[] }>());

  export const errorCategories = createAction(CategoryAction.errorCategories, props<{ error: Error }>());
}
