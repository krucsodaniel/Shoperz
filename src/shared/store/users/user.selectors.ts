import { IUserState, userFeatureKey } from './user.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export namespace UserSelectors {
  export const selectUserFeature = createFeatureSelector<IUserState>(userFeatureKey);

  export const selectUser = createSelector(
    selectUserFeature,
    (state: IUserState) => {
      if (!Object.values(state.user.entities).length) {
        return undefined;
      }

      return Object.values(state.user.entities)[0];
    },
  );
}
