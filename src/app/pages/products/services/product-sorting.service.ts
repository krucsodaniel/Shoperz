import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from 'src/shared/models';
import { SortingOption } from 'src/shared/enums';

@Injectable()
export class ProductSortingService {
  private readonly sortingMethod$ = new Subject<string>();

  public getSortingMethod(): Observable<string> {
    return this.sortingMethod$;
  }

  public setSortingMethod(sortingOption: SortingOption): void {
    this.sortingMethod$.next(sortingOption);
  }

  sortProducts(productArray: IProduct[], sortingMethod: SortingOption): IProduct[] {
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
