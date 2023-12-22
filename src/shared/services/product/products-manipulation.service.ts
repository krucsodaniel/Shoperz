import { Injectable } from '@angular/core';
import { Observable, filter} from 'rxjs';
import { FilterFacadeService, ICalculatedProduct } from '@shared-module';

@Injectable()
export class ProductsManipulationService {
  constructor(private filterFacadeService: FilterFacadeService) {}

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.filterFacadeService.getManipulatedProducts()
      .pipe(filter(Boolean));
  }
}
