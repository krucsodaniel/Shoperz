import { createAction, props } from '@ngrx/store';
import { IUser } from '@shared-module';

const enum UserAction {
  registerUser = '[User] Register user',
  userRegistered = '[User] User registered',
  errorUser = '[User] Error user',
}

export namespace UserActions {
  export const registerUser = createAction(UserAction.registerUser, props<{ user: IUser }>());

  export const userRegistered = createAction(UserAction.userRegistered, props<{ user: IUser }>());

  export const errorUser = createAction(UserAction.errorUser, props<{ error: Error }>());
}
