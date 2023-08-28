import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoryService } from '../../services';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { CategoryActions } from './category.actions';
import { ICategory } from '@shared-module';

@Injectable()
export class CategoryEffects {
  loadCategories$ = createEffect((): Observable<Action> => {
    return this.actions$
      .pipe(
        ofType(CategoryActions.loadCategories),
        switchMap(() => {
          return this.categoryService.getCategories()
            .pipe(
              map((categories: ICategory[]) => CategoryActions.categoriesLoaded({ categories: categories })),
              catchError((error) => of(CategoryActions.errorCategories({ error: new Error(error) })))
            );
        }),
      );
  });

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
  ) {}
}
