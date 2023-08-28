import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SortingOption } from '@shared-module';
import { FilterActions, FilterSelectors } from '../../store';
import { filter, Observable } from 'rxjs';

@Injectable()
export class SortFacadeService {
  constructor(private store: Store) {}

  getSortOption(): Observable<SortingOption> {
    return this.store.select(FilterSelectors.selectSortingOption)
      .pipe(filter(Boolean));
  }

  setSortingOption(sortValue: SortingOption): void {
    this.store.dispatch(FilterActions.setSortingOption({ sortingOption: sortValue }));
  }
}
