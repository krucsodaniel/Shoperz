import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { FilterActions } from './filter.actions';
import { SortingOption } from '../../enums';
import { filter, switchMap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';

const ignoreProductIdPageRegex = /^\/products\/\d+$/;

function getArrayFromQueryParam(queryParams: string | string[] | undefined): string[] {
  if (typeof queryParams === 'string') {
    return [queryParams];
  } else if (Array.isArray(queryParams)) {
    return queryParams;
  } else {
    return [];
  }
}

@Injectable()
export class FilterEffects {
  updateRouteOnFilterChange$ = createEffect(() =>
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      filter(() => !ignoreProductIdPageRegex.test(this.router.url)),
      switchMap(() => {
        const queryParams = this.route.snapshot.queryParams;

        const searchQuery = queryParams['searchQuery'] ? queryParams['searchQuery'] : '';
        const sortingOption = queryParams['sortingOption'] ? queryParams['sortingOption'] : SortingOption.default;

        const brands = getArrayFromQueryParam(queryParams['brands']);
        const categories = getArrayFromQueryParam(queryParams['categories']);
        const prices = getArrayFromQueryParam(queryParams['prices']);

        const filters = {
          brands: brands,
          categories: categories.length ? categories : ['all'],
          prices: prices.length ? prices : ['allPrice'],
        };

        return [
          FilterActions.setSelectedFilters({ selectedFilters: filters }),
          FilterActions.setSearch({ searchValue: searchQuery }),
          FilterActions.setSortingOption({ sortingOption }),
        ];
      }),
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store,
    private route: ActivatedRoute,
  ) {}
}
