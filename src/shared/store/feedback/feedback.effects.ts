import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeedbackService } from '../../services';
import { IFeedback } from '../../models';
import { FeedbackActions } from './feedback.actions';
import { Action } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class FeedbackEffects {
  createFeedback$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(FeedbackActions.createFeedback),
      switchMap(({ feedback }) => {
        return this.feedbackService.createNewFeedback(feedback)
          .pipe(
            map((feedback: IFeedback) => FeedbackActions.feedbackCreated({ feedback })),
            catchError((error: Error) => of(FeedbackActions.errorFeedback({ error }))),
          );
      }),
    ),
  );

  constructor(private actions$: Actions, private feedbackService: FeedbackService) {}
}
