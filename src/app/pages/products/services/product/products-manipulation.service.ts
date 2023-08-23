import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { ICalculatedProduct } from 'src/shared/models';
import { ProductFacadeService } from './product-facade.service';
import { FilterFacadeService } from '../filter/';

@Injectable()
export class ProductsManipulationService {
  constructor(
    private productFacadeService: ProductFacadeService,
    private filterFacadeService: FilterFacadeService,
  ) {}

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.filterFacadeService.getManipulatedProducts()
      .pipe(filter(Boolean));
  };
}
