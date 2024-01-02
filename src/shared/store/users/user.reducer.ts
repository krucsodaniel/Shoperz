import { createReducer, on } from '@ngrx/store';
import { IUser } from '@shared-module';
import { UserActions } from './user.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const userFeatureKey = 'user';

export interface IUserState {
  user: EntityState<IUser>;
  error?: Error;
}

export const userAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: (user: IUser) => user.id,
});

export const initialState: IUserState = {
  user: userAdapter.getInitialState({}),
  error: undefined,
}

export const userReducer = createReducer(
  initialState,
  on(UserActions.userInitialized, (state, { user }) => {
    return {
      ...state,
      user: userAdapter.addOne(user, state.user),
    };
  }),
  on(UserActions.userLoggedIn, (state, { user }) => {
    return {
      ...state,
      user: userAdapter.addOne(user, state.user),
    };
  }),
  on(UserActions.userLoggedOut, (state, { userId }) => {
    return {
      ...state,
      user: userAdapter.removeOne(userId, state.user),
    };
  }),
  on(UserActions.errorUser, (state, { error }) => {
    return {
      ...state,
      error,
    };
  }),
);
