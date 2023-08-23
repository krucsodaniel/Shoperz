import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilterActions } from 'src/app/pages/products/store';

@Injectable()
export class SearchFacadeService {
  constructor(private store: Store) {}

  setSearchValue(searchValue: string): void {
    this.store.dispatch(FilterActions.setSearch({ searchValue }));
  }
}
