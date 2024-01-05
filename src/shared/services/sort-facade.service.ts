import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SortingOption } from '../enums';
import { FilterSelectors } from '../store/filters';
import { filter, Observable } from 'rxjs';

@Injectable()
export class SortFacadeService {
  constructor(private store: Store) {}

  getSortOption(): Observable<SortingOption> {
    return this.store.select(FilterSelectors.selectSortingOption)
      .pipe(filter(Boolean));
  }
}
