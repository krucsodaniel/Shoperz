import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../models';

@Injectable()
export class SearchService {
  private readonly search$ = new Subject<string>();

  getSearchValue(): Observable<string> {
    return this.search$;
  }

  setSearchValue(value: string): void {
    this.search$.next(value);
  }

  searchProductsByName(products: IProduct[], searchParam: string): IProduct[] {
    const searchArray = products.slice();
    const searchValue = searchParam.trim().toLowerCase();

    return searchArray.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue));
  }
}
