import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionDispatcherService } from '../action-dispatcher.service';
import { UserService } from './user.service';
import { UserActions } from '../../store/users/user.actions';
import { UserActionKey } from '../../enums/';
import { IUser } from '../../models';

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
}
