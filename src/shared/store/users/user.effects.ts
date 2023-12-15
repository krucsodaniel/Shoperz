import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, ToastService, UserService } from '../../services';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserActions } from './user.actions';
import { UserActionKey, IUser } from '@shared-module';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UserEffects {
  registerUser$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(UserActions.registerUser),
        switchMap(({ user }) => {
          return this.userService.registerUser(user)
            .pipe(
              map((user: IUser) => UserActions.userRegistered({ user })),
              tap(() => this.actionTrackerService.sendAction(UserActionKey.registerUser)),
              tap(() => this.toastService.showSuccessToast(this.translate.instant('registrationPage.form.registrationSuccess'))),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(UserActionKey.registerUser, error);
                return EMPTY;
              }),
            );
        }),
      );
  });

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private actionTrackerService: ActionTrackerService,
    private toastService: ToastService,
    private translate: TranslateService,
  ) {}
}
