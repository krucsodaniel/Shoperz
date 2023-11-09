import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, FeedbackService } from '../../services';
import { IFeedback } from '../../models';
import { FeedbackActions } from './feedback.actions';
import { Action } from '@ngrx/store';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { FeedbackActionKey } from '../../enums';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class FeedbackEffects {
  createFeedback$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(FeedbackActions.createFeedback),
      switchMap(({ feedback }) => {
        return this.feedbackService.createNewFeedback(feedback)
          .pipe(
            map((feedback: IFeedback) => FeedbackActions.feedbackCreated({ feedback })),
            tap(() => this.actionTrackerService.sendAction(FeedbackActionKey.addFeedback)),
            catchError((error: HttpErrorResponse) => {
              this.actionTrackerService.sendAction(FeedbackActionKey.addFeedback, error);
              return EMPTY;
            }),
          );
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private feedbackService: FeedbackService,
    private actionTrackerService: ActionTrackerService,
  ) {}
}
