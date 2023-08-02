import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, combineLatest } from 'rxjs';
import { ICalculatedProduct, IFilterDefinition } from 'src/shared/models';
import { SortingOption } from 'src/shared/enums';
import { ProductFacadeService } from './product-facade.service';
import { FilterService } from '../filter.service';

@Injectable()
export class ProductsManipulationService {
  private readonly search$ = new BehaviorSubject<string>('');
  private readonly sortingOption$ = new BehaviorSubject<SortingOption>(SortingOption.default);
  private readonly filter$ = new BehaviorSubject<Record<string, string[]>>({});

  constructor(private productFacadeService: ProductFacadeService, private filterService: FilterService) {}

  setSearchValue(value: string): void {
    this.search$.next(value);
  }

  setSortingOption(sortingOption: SortingOption): void {
    this.sortingOption$.next(sortingOption);
  }

  searchProductsByName(products: ICalculatedProduct[], searchKeyword: string): ICalculatedProduct[] {
    const searchArray = products.slice();

    return searchArray.filter((product: ICalculatedProduct) => product.name.toLowerCase().includes(searchKeyword));
  }

  sortProducts(productArray: ICalculatedProduct[], sortingMethod: SortingOption): ICalculatedProduct[] {
    if (!productArray?.length) {
      return [];
    }

    const sortedArray = productArray.slice();

    switch (sortingMethod) {
      case SortingOption.default:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => a.id - b.id);
        break;
      case SortingOption.nameAscending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => a.name.localeCompare(b.name));
        break;
      case SortingOption.nameDescending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => b.name.localeCompare(a.name));
        break;
      case SortingOption.priceAscending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => a.price - b.price);
        break;
      case SortingOption.priceDescending:
        sortedArray.sort((a: ICalculatedProduct, b: ICalculatedProduct) => b.price - a.price);
        break;
    }

    return sortedArray;
  }

  getProducts(): Observable<ICalculatedProduct[]> {
    return combineLatest([
      this.productFacadeService.getProducts(),
      this.search$,
      this.sortingOption$,
      this.filter$,
      this.filterService.getFilterDefinitions(),
    ])
      .pipe(
        map(([
          products,
          search,
          sortOption,
          filter,
          filterDefinitions,
        ]: [ICalculatedProduct[], string, SortingOption, Record<string, string[]>, IFilterDefinition[]]) => {
          let result: ICalculatedProduct[] = [];
          result = this.searchProductsByName(products, search);
          result = this.sortProducts(result, sortOption);

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
        }),
      ) as Observable<[]>;
  };

  setFilter(filter: Record<string, string[]>): void {
    this.filter$.next(filter);
  };
}
