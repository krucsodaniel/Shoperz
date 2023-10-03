import { createAction, props } from '@ngrx/store';
import { IFeedback } from '../../models';

export const enum FeedbackAction {
  createFeedback = '[Feedback] Create feedback',
  feedbackCreated = '[Feedback] Feedback created',
  errorFeedback = '[Feedback] Error during process',
}

export namespace FeedbackActions {
  export const createFeedback = createAction(FeedbackAction.createFeedback, props<{ feedback: IFeedback }>());

  export const feedbackCreated = createAction(FeedbackAction.feedbackCreated, props<{ feedback: IFeedback }>());

  export const errorFeedback = createAction(FeedbackAction.errorFeedback, props<{ error: Error }>());
}
