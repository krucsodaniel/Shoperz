import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, combineLatest } from 'rxjs';
import { IProduct } from 'src/shared/models';
import { SortingOption } from 'src/shared/enums';
import { ProductFacadeService } from './product-facade.service';

@Injectable()
export class ProductsManipulationService {
  private readonly search$ = new BehaviorSubject<string>('');
  private readonly sortingOption$ = new BehaviorSubject<SortingOption>(SortingOption.default);

  constructor(private productFacadeService: ProductFacadeService) {}

  getProducts(): Observable<IProduct[]> {
    return combineLatest([
      this.productFacadeService.getProducts(),
      this.search$,
      this.sortingOption$,
    ])
      .pipe(
        map(([products, search, sortOption]: [IProduct[], string, SortingOption]) => {
          const searchResult = this.searchProductsByName(products, search);
          return this.sortProducts(searchResult, sortOption);
        }),
      );
  }

  getSearchValue(): Observable<string> {
    return this.search$;
  }

  setSearchValue(value: string): void {
    this.search$.next(value);
  }

  getSortingOption(): Observable<string> {
    return this.sortingOption$;
  }

  setSortingOption(sortingOption: SortingOption): void {
    this.sortingOption$.next(sortingOption);
  }

  searchProductsByName(products: IProduct[], searchKeyword: string): IProduct[] {
    const searchArray = products.slice();

    return searchArray.filter((product: IProduct) => product.name.toLowerCase().includes(searchKeyword));
  }

  sortProducts(productArray: IProduct[], sortingMethod: SortingOption): IProduct[] {
    if (!productArray?.length) {
      return [];
    }

    const sortedArray = productArray.slice();

    switch (sortingMethod) {
      case SortingOption.default:
        sortedArray.sort((a: IProduct, b: IProduct) => a.id - b.id);
        break;
      case SortingOption.nameAscending:
        sortedArray.sort((a: IProduct, b: IProduct) => a.name.localeCompare(b.name));
        break;
      case SortingOption.nameDescending:
        sortedArray.sort((a: IProduct, b: IProduct) => b.name.localeCompare(a.name));
        break;
      case SortingOption.priceAscending:
        sortedArray.sort((a: IProduct, b: IProduct) => a.price - b.price);
        break;
      case SortingOption.priceDescending:
        sortedArray.sort((a: IProduct, b: IProduct) => b.price - a.price);
        break;
    }

    return sortedArray;
  }
}
