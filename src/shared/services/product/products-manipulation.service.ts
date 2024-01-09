import { Injectable } from '@angular/core';
import { Observable, filter} from 'rxjs';
import { FilterFacadeService } from '../filter-facade.service';
import { ICalculatedProduct } from '../../models';

@Injectable()
export class ProductsManipulationService {
  constructor(private filterFacadeService: FilterFacadeService) {}

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.filterFacadeService.getManipulatedProducts()
      .pipe(filter(Boolean));
  }
}
