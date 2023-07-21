import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../models';

@Injectable()
export class SearchService {
  private readonly search$ = new Subject<string>();
  private readonly delete$ = new Subject<void>();

  getSearchValue(): Observable<string> {
    return this.search$;
  }

  setSearchValue(value: string): void {
    this.search$.next(value);
  }

  getDeleteValue(): Observable<void> {
    return this.delete$;
  }

  setDeleteValue(): void {
    this.delete$.next();
  }

  searchProductsByName(database: IProduct[], searchParam: string): IProduct[] {
    if (!searchParam.trim()) {
      return database;
    }

    const searchArray = database.slice();
    const searchValue = searchParam.trim().toLowerCase();

    return searchArray.filter((product: IProduct) => product.name.toLowerCase().includes(searchValue));
  }
}
