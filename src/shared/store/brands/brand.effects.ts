import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BrandService } from '../../services';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { BrandActions } from './brand.actions';
import { IBrand } from '@shared-module';

@Injectable()
export class BrandEffects {
  loadBrands$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(BrandActions.loadBrands),
        switchMap(() => {
          return this.brandService.getBrands()
            .pipe(
              map((brands: IBrand[]) => BrandActions.brandsLoaded({ brands: brands })),
              catchError((error) => of(BrandActions.errorBrands({ error: new Error(error) })))
            );
        }),
      );
  });

  constructor(
    private actions$: Actions,
    private brandService: BrandService,
  ) {}
}
