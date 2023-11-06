import { createReducer, on } from '@ngrx/store';
import { IFilterDefinition, SortingOption } from '@shared-module';
import { FilterActions } from './filter.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const filtersFeatureKey = 'filters';

export interface IFilterState {
  filterDefinitions: EntityState<IFilterDefinition>;
  selectedFilters: Record<string, string[]>;
  sortingOption?: SortingOption;
  searchValue?: string;
  isLoading: boolean;
  error: Error;
}

export const filterAdapter: EntityAdapter<IFilterDefinition> = createEntityAdapter<IFilterDefinition>({
  selectId: (filterDefinition: IFilterDefinition) => filterDefinition.id,
});

export const initialState: IFilterState = {
  filterDefinitions: filterAdapter.getInitialState({}),
  selectedFilters: undefined,
  sortingOption: undefined,
  searchValue: undefined,
  isLoading: false,
  error: undefined,
}

export const filterReducer = createReducer(
  initialState,
  on(FilterActions.initializeFilters, (state, { filterDefinitions }) => {
    return {
      ...state,
      filterDefinitions: filterAdapter.addMany(filterDefinitions, state.filterDefinitions),
      isLoading: false,
    };
  }),
  on(FilterActions.setSelectedFilters, (state, { selectedFilters }) => {
    return {
      ...state,
      selectedFilters,
    };
  }),
  on(FilterActions.setSortingOption, (state, { sortingOption }) => {
    return {
      ...state,
      sortingOption,
    };
  }),
  on(FilterActions.setSearch, (state, { searchValue }) => {
    return {
      ...state,
      searchValue,
    };
  }),
  on(FilterActions.errorFilter, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
);
