import { createReducer, on } from '@ngrx/store';
import { IBrand } from '@shared-module';
import { BrandActions } from './brand.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const brandsFeatureKey = 'brands';

export interface IBrandState {
  brands: EntityState<IBrand>;
  error?: Error;
}

export const brandAdapter: EntityAdapter<IBrand> = createEntityAdapter<IBrand>({
  selectId: (brand: IBrand) => brand.id,
});

export const initialState: IBrandState = {
  brands: brandAdapter.getInitialState({}),
  error: undefined,
};

export const brandReducer = createReducer(
  initialState,
  on(BrandActions.brandsLoaded, (state, { brands }) => {
    return {
      ...state,
      brands: brandAdapter.addMany(brands, state.brands),
    };
  }),
  on(BrandActions.errorBrands, (state, action) => ({
    ...state,
    error: action.error,
  })),
);
