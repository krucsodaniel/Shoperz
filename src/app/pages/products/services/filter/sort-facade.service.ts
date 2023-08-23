import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SortingOption } from 'src/shared/enums';
import { FilterActions } from '../../store';

@Injectable()
export class SortFacadeService {
  constructor(private store: Store) {}

  setSortingOption(sortValue: SortingOption): void {
    this.store.dispatch(FilterActions.setSortingOption({ sortingOption: sortValue }));
  }
}
