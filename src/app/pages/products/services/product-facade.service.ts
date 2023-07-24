import { Injectable } from '@angular/core';
import { ProductService } from './'
import { BehaviorSubject, filter, firstValueFrom, Observable } from 'rxjs';
import { IProduct } from 'src/shared/models';

@Injectable()
export class ProductFacadeService {
  private readonly products$ = new BehaviorSubject<IProduct[]>(undefined);

  constructor(private productService: ProductService) {}

  async initProducts(): Promise<void> {
    if (!this.products$.getValue()) {
      const products = await firstValueFrom(this.productService.getProducts());
      this.products$.next(products);
    }
  }

  getProducts(): Observable<IProduct[]> {
    return this.products$.pipe(filter(Boolean));
  }
}
