import { Injectable } from '@angular/core';
import { Observable, filter } from 'rxjs';
import { ICalculatedProduct } from '@shared-module';
import { ProductFacadeService, FilterFacadeService } from '../../services';

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
