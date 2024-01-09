import { createAction, props } from '@ngrx/store';
import { ILogin, IUser } from '../../models';

const enum UserAction {
  registerUser = '[User] Register user',
  userRegistered = '[User] User registered',
  loginUser = '[User] Login user',
  userLoggedIn = '[User] User logged in',
  logoutUser = '[User] Logout user',
  userLoggedOut = '[User] User logged out',
  initUser = '[User] Initialize user',
  userInitialized = '[User] User initialized',
  errorUser = '[User] Error user',
}

export namespace UserActions {
  export const registerUser = createAction(UserAction.registerUser, props<{ user: IUser }>());
  export const userRegistered = createAction(UserAction.userRegistered, props<{ user: IUser }>());

  export const logoutUser = createAction(UserAction.logoutUser);
  export const userLoggedOut = createAction(UserAction.userLoggedOut, props<{ userId: string }>());

  export const loginUser = createAction(UserAction.loginUser, props<{ credentials: ILogin }>());
  export const userLoggedIn = createAction(UserAction.userLoggedIn, props<{ user: IUser }>());

  export const initUser = createAction(UserAction.initUser);
  export const userInitialized = createAction(UserAction.userInitialized, props<{ user: IUser }>());

  export const errorUser = createAction(UserAction.errorUser, props<{ error: Error }>());
}
