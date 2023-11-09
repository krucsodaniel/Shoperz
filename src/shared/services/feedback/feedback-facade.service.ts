import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeedbackActions } from '../../store';
import { IFeedback } from '../../models';
import { ActionDispatcherService } from '../action-dispatcher.service';
import { FeedbackActionKey } from '../../enums';

@Injectable()
export class FeedbackFacadeService {
  constructor(private store: Store, private actionDispatcherService: ActionDispatcherService) {}

  async createNewFeedback(feedback: IFeedback): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      FeedbackActions.createFeedback({ feedback }),
      FeedbackActionKey.addFeedback,
    );
  }
}
