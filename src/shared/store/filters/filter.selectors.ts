import { IFilterState, filtersFeatureKey } from './filter.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductSelectors } from '@shared-module';
import { ICalculatedProduct, SortingOption } from '@shared-module';

export namespace FilterSelectors {
  export const selectFilterFeature = createFeatureSelector<IFilterState>(filtersFeatureKey);

  export const selectAllFilters = createSelector(
    selectFilterFeature,
    (state: IFilterState) => {
      if (!Object.values(state.filterDefinitions.entities).length) {
        return undefined;
      }

      return Object.values(state.filterDefinitions.entities);
    },
  );

  export const selectFilter = createSelector(
    selectFilterFeature,
    (state: IFilterState) => state.selectedFilters,
  );

  export const selectSortingOption = createSelector(
    selectFilterFeature,
    (state: IFilterState) => state.sortingOption,
  );

  export const selectSearchValue = createSelector(
    selectFilterFeature,
    (state: IFilterState) => state.searchValue,
  );

  const searchProductsByName = (products: ICalculatedProduct[], searchKeyword: string): ICalculatedProduct[] => {
    return products.filter((product: ICalculatedProduct) => product.name.toLowerCase().includes(searchKeyword.toLowerCase()));
  };

  const sortProducts = (productArray: ICalculatedProduct[], sortingMethod: SortingOption): ICalculatedProduct[] => {
    if (!productArray?.length) {
      return [];
    }

    const sortedArray = productArray.slice();

    switch (sortingMethod) {
      case SortingOption.default:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => a.id - b.id);
        break;
      case SortingOption.nameAscending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) =>
          a.name.localeCompare(b.name)
        );
        break;
      case SortingOption.nameDescending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) =>
          b.name.localeCompare(a.name)
        );
        break;
      case SortingOption.priceAscending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => a.price - b.price);
        break;
      case SortingOption.priceDescending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => b.price - a.price);
        break;
    }

    return sortedArray;
  };

  export const selectManipulatedProducts = createSelector(
    ProductSelectors.getCalculatedProducts,
    selectSearchValue,
    selectSortingOption,
    selectFilter,
    selectAllFilters,
    (products, search, sortOption, filter, filterDefinitions) => {
      if (!products || !sortOption || !filter || !filterDefinitions) {
        return undefined;
      }

      let result = [];

      result = searchProductsByName(products, search);
      result = sortProducts(result, sortOption);

      const filterKeys = Object.keys(filter);

      filterKeys
        .filter((filterKey) => filter[filterKey]?.length)
        .forEach((filterKey) => {
          const filterValues = filter[filterKey];
          const definition = filterDefinitions.find(({ id }) => id === filterKey);
          const options = definition.options.filter(({ id }) => filterValues.includes(id));
          const hasCustomFilterFn = options.some(({ customFilterFn }) => !!customFilterFn);

          if (filterValues.length === 1 && filterValues[0] === 'all') {
            return;
          }

          result = result.filter((data) => {
            const dataField = definition.propertySelector(data);

            if (hasCustomFilterFn) {
              return options.every((option) => option.customFilterFn(dataField));
            } else {
              return filterValues.includes(dataField);
            }
          });
        });

      return result;
    }
  );
}
