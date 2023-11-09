import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, shareReplay, tap } from 'rxjs';
import { IActionTracker } from '../models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ActionTrackerService {
  private actions$ = new BehaviorSubject<IActionTracker>(null);

  getAction(actionName: IActionTracker['actionName']): Observable<IActionTracker['data']> {
    return this.actions$
      .pipe(
        filter(Boolean),
        tap((action: IActionTracker) => {
          if (action.data instanceof Error || action.data instanceof HttpErrorResponse) {
            throw action.data;
          }
        }),
        filter((action: IActionTracker) => action.actionName === actionName),
        map((action: IActionTracker) => action.data),
        shareReplay({ refCount: true }),
      );
  }

  sendAction(actionName: IActionTracker['actionName'], data?: IActionTracker['data']): void {
    this.actions$.next({ actionName, data });
  }
}
