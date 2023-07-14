import { Injectable } from '@angular/core';
import { ProductService } from './'
import { Observable } from 'rxjs';
import { IProduct } from 'src/shared/models';

@Injectable()
export class ProductFacadeService {
  constructor(private productService: ProductService) {}

  getProducts(): Observable<IProduct[]> {
    return this.productService.getProducts();
  }
}
