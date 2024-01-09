import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionDispatcherService } from '../action-dispatcher.service';
import { UserService } from './user.service';
import { UserActions, UserSelectors } from '../../store/users';
import { UserActionKey } from '../../enums/';
import { ILogin, IUser } from '../../models';
import { Observable } from 'rxjs';

@Injectable()
export class UserFacadeService {
  constructor(
    private userService: UserService,
    private store: Store,
    private actionDispatcherService: ActionDispatcherService,
  ) {}

  async registerUser(user: IUser): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      UserActions.registerUser({ user }),
      UserActionKey.registerUser,
    );
  }

  async loginUser(credentials: ILogin): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      UserActions.loginUser({ credentials }),
      UserActionKey.loginUser,
    );
  }

  async logoutUser(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      UserActions.logoutUser(),
      UserActionKey.logoutUser,
    );
  }

  async initUserState(): Promise<void> {
    if (!localStorage.getItem(('userId'))) {
      return;
    }

    return await this.actionDispatcherService.dispatchAsync(
      UserActions.initUser(),
      UserActionKey.initializeUser,
    );
  }

  selectUser(): Observable<IUser> {
    return this.store.select(UserSelectors.selectUser);
  }
}
