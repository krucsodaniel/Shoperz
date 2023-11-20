import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterSelectors } from '../store';
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
}
