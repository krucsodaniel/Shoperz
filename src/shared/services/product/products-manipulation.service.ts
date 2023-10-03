import { Injectable } from '@angular/core';
import { Observable, filter} from 'rxjs';
import { FilterFacadeService, ICalculatedProduct } from '@shared-module';
import { ProductFacadeService } from './product-facade.service';

@Injectable()
export class ProductsManipulationService {
  constructor(
    private productFacadeService: ProductFacadeService,
    private filterFacadeService: FilterFacadeService,
  ) {}

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.filterFacadeService.getManipulatedProducts()
      .pipe(filter(Boolean));
  }
}
