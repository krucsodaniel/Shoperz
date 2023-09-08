import { Injectable } from '@angular/core';
import { Observable, filter} from 'rxjs';
import { ICalculatedProduct } from '@shared-module';
import { ProductFacadeService } from './product-facade.service';
import { FilterFacadeService } from 'src/app/pages/products/services'

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
