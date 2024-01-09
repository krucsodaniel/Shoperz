import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, ToastService, UserService } from '../../services';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { UserActions } from './user.actions';
import { IUser } from '../../models';
import { UserActionKey } from '../../enums';
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

  loginUser$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(UserActions.loginUser),
        switchMap(({ credentials }) => {
          return this.userService.loginUser(credentials)
            .pipe(
              map((user: IUser) => {
                this.setUserIdInLocalStorage(user.id);

                return UserActions.userLoggedIn({ user });
              }),
              tap(() => {
                this.actionTrackerService.sendAction(UserActionKey.loginUser);

                this.toastService.showSuccessToast(this.translate.instant('loginPage.form.loginSuccess'));
              }),
              catchError((error: Error) => {
                if (error.message === 'User not found') {
                  this.toastService.showErrorToast(this.translate.instant('loginPage.form.loginSuccess'));
                } else if (error.message === 'Incorrect password') {
                  this.toastService.showErrorToast(this.translate.instant('loginPage.form.incorrectPassword'));
                } else {
                  this.toastService.showErrorToast(this.translate.instant('loginPage.form.anErrorOccured'));
                }
                this.actionTrackerService.sendAction(UserActionKey.loginUser, error);
                return EMPTY;
              }),
            );
        }),
      );
  });

  logoutUser$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(UserActions.logoutUser),
        map(() => {
          const userId = this.getUserIdFromLocalStorage();

          return UserActions.userLoggedOut({ userId });
        }),
        tap(() => {
          this.clearLocalStorage();

          this.actionTrackerService.sendAction(UserActionKey.logoutUser);

          this.toastService.showSuccessToast(this.translate.instant('loginPage.form.logoutSuccess'));
        }),
        catchError((error: HttpErrorResponse) => {
          this.actionTrackerService.sendAction(UserActionKey.logoutUser, error);
          return EMPTY;
        }),
      );
  });

  initUser$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(UserActions.initUser),
      switchMap(() => {
        const userId = this.getUserIdFromLocalStorage();

        return this.userService.getUserById(userId)
          .pipe(
            map((user: IUser) => UserActions.userInitialized({ user })),
            tap(() => this.actionTrackerService.sendAction(UserActionKey.initializeUser)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(UserActionKey.initializeUser, error);
              return EMPTY;
            }),
          );
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private actionTrackerService: ActionTrackerService,
    private toastService: ToastService,
    private translate: TranslateService,
  ) {}

  private setUserIdInLocalStorage(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  private getUserIdFromLocalStorage(): string {
    return localStorage.getItem('userId');
  }

  private clearLocalStorage(): void {
    localStorage.clear();
  }
}
