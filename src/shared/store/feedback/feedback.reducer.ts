import { createReducer, on } from '@ngrx/store';
import { IFeedback } from '../../models';
import { FeedbackActions } from './feedback.actions';

export const feedbackFeatureKey = 'feedback';

export interface IFeedbackState {
  feedbacks: IFeedback[];
  error: Error;
}

export const initialState: IFeedbackState = {
  feedbacks: undefined,
  error: undefined,
}

export const feedbackReducer = createReducer(
  initialState,
  on(FeedbackActions.feedbackCreated, (state, action) => ({
    ...state,
    feedbacks: [...(state.feedbacks || []), action.feedback],
  })),
)
