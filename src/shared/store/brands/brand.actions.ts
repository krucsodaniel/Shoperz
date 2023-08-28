import { createAction, props } from '@ngrx/store';
import { IBrand } from '@shared-module';

const enum BrandAction {
  loadBrands = '[Brands] Load brands',
  brandsLoaded = '[Brands] Brands loaded',
  errorBrands = '[Brands] Error brands',
}

export namespace BrandActions {
  export const loadBrands = createAction(BrandAction.loadBrands);

  export const brandsLoaded = createAction(BrandAction.brandsLoaded, props<{ brands: IBrand[] }>());

  export const errorBrands = createAction(BrandAction.errorBrands, props<{ error: Error }>());
}
