import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeedbackActions } from '../../store/feedback/feedback.actions';
import { IFeedback } from '../../models';

@Injectable()
export class FeedbackFacadeService {
  constructor(private store: Store) {}

  createNewFeedback(feedback: IFeedback): void {
    this.store.dispatch(FeedbackActions.createFeedback({ feedback }));
  }
}
