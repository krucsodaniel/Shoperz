import { createAction, props } from '@ngrx/store';
import { IFilterDefinition } from '../../models';
import { SortingOption } from '../../enums';

export const enum FilterAction {
  initializeFilters = '[Filter] Initialize filters',
  setSelectedFilters = '[Filters] Set selected filters',
  setSortingOption = '[Filters] Set sorting option',
  setSearch = '[Filters] Set search',
  errorFilter = '[Filters] Error during process',
}

export namespace FilterActions {
  export const initializeFilters = createAction(
    FilterAction.initializeFilters,
    props<{ filterDefinitions: IFilterDefinition[] }>(),
  );

  export const setSelectedFilters = createAction(FilterAction.setSelectedFilters, props<{ selectedFilters: Record<string, string[]> }>());

  export const setSortingOption = createAction(FilterAction.setSortingOption, props<{ sortingOption: SortingOption }>());

  export const setSearch = createAction(FilterAction.setSearch, props<{ searchValue: string }>());

  export const errorFilter = createAction(FilterAction.errorFilter, props<{ error: Error }>());
}
