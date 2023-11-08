import { createReducer, on } from '@ngrx/store';
import { IFeedback } from '../../models';
import { FeedbackActions } from './feedback.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const feedbackFeatureKey = 'feedback';

export interface IFeedbackState {
  feedbacks: EntityState<IFeedback>;
  error: Error;
}

export const feedbackAdapter: EntityAdapter<IFeedback> = createEntityAdapter<IFeedback>({
  selectId: (feedback: IFeedback) => feedback.id,
});

export const initialState: IFeedbackState = {
  feedbacks: feedbackAdapter.getInitialState({}),
  error: undefined,
}

export const feedbackReducer = createReducer(
  initialState,
  on(FeedbackActions.feedbackCreated, (state, { feedback }) => {
    return {
      ...state,
      feedbacks: feedbackAdapter.addOne(feedback, state.feedbacks),
    };
  }),
)
