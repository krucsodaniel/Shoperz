import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, CategoryService } from '../../services';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { CategoryActions } from './category.actions';
import { CategoryActionEnum, ICategory } from '@shared-module';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(CategoryActions.loadCategories),
        switchMap(() => {
          return this.categoryService.getCategories()
            .pipe(
              map((categories: ICategory[]) => CategoryActions.categoriesLoaded({ categories })),
              tap(() => this.actionTrackerService.sendAction(CategoryActionEnum.loadCategories)),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(CategoryActionEnum.loadCategories, error);
                return EMPTY;
              }),
            );
        }),
      );
  });

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private actionTrackerService: ActionTrackerService,
  ) {}
}
