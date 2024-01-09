import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, BrandService } from '../../services';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { BrandActions } from './brand.actions';
import { BrandActionKey } from '../../enums';
import { IBrand } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BrandEffects {
  loadBrands$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(BrandActions.loadBrands),
        switchMap(() => {
          return this.brandService.getBrands()
            .pipe(
              map((brands: IBrand[]) => BrandActions.brandsLoaded({ brands })),
              tap(() => this.actionTrackerService.sendAction(BrandActionKey.loadBrands)),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(BrandActionKey.loadBrands, error);
                return EMPTY;
              }),
            );
        }),
      );
  });

  constructor(
    private actions$: Actions,
    private brandService: BrandService,
    private actionTrackerService: ActionTrackerService,
  ) {}
}
