import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { ActionTrackerService } from './action-tracker.service';

@Injectable()
export class ActionDispatcherService {
  constructor(private store: Store, private actionTrackerService: ActionTrackerService) {}

  dispatchAsync(action: Action, actionName: string): Promise<any> {
    this.store.dispatch(action);

    return firstValueFrom(this.actionTrackerService.getAction(actionName));
  }
}
