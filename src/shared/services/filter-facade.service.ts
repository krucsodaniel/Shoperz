import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ICalculatedProduct, IFilterDefinition } from '@shared-module';
import { Store } from '@ngrx/store';
import { FilterActions, FilterSelectors } from '../store/filters';

@Injectable()
export class FilterFacadeService {
  constructor(private store: Store) {}

  getFilterDefinitions(): Observable<IFilterDefinition[]> {
    return this.store.select(FilterSelectors.selectAllFilters)
      .pipe(filter(Boolean));
  }

  getFilterValue(): Observable<Record<string, string[]>> {
    return this.store.select(FilterSelectors.selectFilter)
      .pipe(filter(Boolean));
  }

  getManipulatedProducts(): Observable<ICalculatedProduct[]> {
    return this.store.select(FilterSelectors.selectManipulatedProducts);
  }
}
