import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FilterActions } from './filter.actions';
import { combineLatest, take, tap } from 'rxjs';
import { Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Injectable()
export class FilterEffects {
  pageOpening$ = createEffect(() => {
    return combineLatest([
      this.actions$.pipe(ofType(FilterActions.setSelectedFilters), take(1)),
      this.actions$.pipe(ofType(FilterActions.setSearch), take(1)),
      this.actions$.pipe(ofType(FilterActions.setSortingOption), take(1)),
    ])
      .pipe(
        tap(() => {
          const { searchQuery, sortingOption, ...filterParams } = this.router.routerState.root.snapshot.queryParams;

          if (filterParams) {
            const selectedFilters = Object.keys(filterParams)
              .reduce((result: Record<string, string[]>, filterField: string) => {
                return {
                  ...result,
                  [filterField]: filterParams[filterField].split(','),
                };
              }, {});

            this.store.dispatch(FilterActions.setSelectedFilters({ selectedFilters }));
          }

          if (searchQuery) {
            this.store.dispatch(FilterActions.setSearch({ searchValue: searchQuery }));
          }

          if (sortingOption) {
            this.store.dispatch(FilterActions.setSortingOption({ sortingOption }));
          }
        }),
      );
  }, { dispatch: false });

  filtering$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FilterActions.setSelectedFilters),
        tap(({ selectedFilters }) => {
          const filterParams = Object.keys(selectedFilters)
            .reduce((result: Record<string, string | null>, key: string) => {
              result[key] = selectedFilters[key].length ? selectedFilters[key].join(',') : null;

              return result;
            }, {});

          this.setRouteParams({
            ...this.router.routerState.root.snapshot.queryParams,
            ...filterParams,
          });
        }),
      );
  }, { dispatch: false });

  searching$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FilterActions.setSearch),
        tap(({ searchValue }) => {
          this.setRouteParams({
            ...this.router.routerState.root.snapshot.queryParams,
            searchQuery: searchValue || null,
          });
        }),
      );
  }, { dispatch: false });

  sorting$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(FilterActions.setSortingOption),
        tap(({ sortingOption }) => {
          this.setRouteParams({
            ...this.router.routerState.root.snapshot.queryParams,
            sortingOption,
          });
        }),
      );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store,
  ) {}

  private setRouteParams(queryParams: Params): void {
    this.router.navigate([], { queryParams, replaceUrl: true });
  }
}
