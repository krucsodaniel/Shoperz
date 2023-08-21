import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { IBrand } from 'src/shared/models';
import { BrandService } from './brand.service';
import { Store } from '@ngrx/store';
import { BrandActions, BrandSelectors } from '../../store';

@Injectable()
export class BrandFacadeService {
  constructor(private brandService: BrandService, private store: Store) {}

  initBrandsState(): void {
    this.store.dispatch(BrandActions.loadBrands());
  }

  getBrands(): Observable<IBrand[]> {
    return this.store.select(BrandSelectors.selectBrands)
      .pipe(filter(Boolean));
  }
}
