import { createReducer, on } from '@ngrx/store';
import { IFilterDefinition } from 'src/shared/models';
import { SortingOption } from 'src/shared/enums';
import { FilterActions } from './filter.actions';

export const filtersFeatureKey = 'filters';

export interface IFilterState {
  filterDefinitions: IFilterDefinition[];
  selectedFilters: Record<string, string[]>;
  sortingOption?: SortingOption;
  searchValue?: string;
  isLoading: boolean;
  error: Error;
}

export const initialState: IFilterState = {
  filterDefinitions: undefined,
  selectedFilters: undefined,
  sortingOption: undefined,
  searchValue: undefined,
  isLoading: false,
  error: undefined,
}

export const filterReducer = createReducer(
  initialState,
  on(FilterActions.initializeFilters, (state, action) => ({
    ...state,
    filterDefinitions: action.filterDefinitions,
    sortingOption: action.sortingOption,
    searchValue: action.searchValue,
    isLoading: false,
  })),
  on(FilterActions.setSelectedFilters, (state, action) => ({
    ...state,
    selectedFilters: action.selectedFilters,
  })),
  on(FilterActions.setSortingOption, (state, action) => ({
    ...state,
    sortingOption: action.sortingOption,
  })),
  on(FilterActions.setSearch, (state, action) => ({
    ...state,
    searchValue: action.searchValue,
  })),
  on(FilterActions.errorFilter, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);
