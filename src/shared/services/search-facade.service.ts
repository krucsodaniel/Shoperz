import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions, FilterSelectors } from 'src/app/pages/products/store';
import { filter, Observable } from 'rxjs';

@Injectable()
export class SearchFacadeService {
  constructor(private store: Store) {}

  getSearchValue(): Observable<string> {
    return this.store.select(FilterSelectors.selectSearchValue)
      .pipe(
        filter((searchValue: string | undefined) => searchValue !== undefined),
      );
  }

  setSearchValue(searchValue: string): void {
    this.store.dispatch(FilterActions.setSearch({ searchValue }));
  }
}
