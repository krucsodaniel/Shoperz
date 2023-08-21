import { createReducer, on } from '@ngrx/store';
import { IBrand } from 'src/shared/models';
import { BrandActions } from './brand.actions';

export const brandsFeatureKey = 'brands';

export interface IBrandState {
  brands: IBrand[];
  error: Error;
}

export const initialState: IBrandState = {
  brands: undefined,
  error: undefined,
}

export const brandReducer = createReducer(
  initialState,
  on(BrandActions.brandsLoaded, (state, action) => ({
    ...state,
    brands: action.brands,
  })),
  on(BrandActions.errorBrands, (state, action) => ({
    ...state,
    error: action.error,
  })),
);
