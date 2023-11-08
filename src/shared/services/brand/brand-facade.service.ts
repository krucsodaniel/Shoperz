import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ActionDispatcherService, IBrand } from '@shared-module';
import { BrandService } from './brand.service';
import { Store } from '@ngrx/store';
import { BrandSelectors, BrandActions } from '../../store';
import { BrandActionEnum } from '../../enums';

@Injectable()
export class BrandFacadeService {
  constructor(
    private brandService: BrandService,
    private store: Store,
    private actionDispatcherService: ActionDispatcherService,
    ) {}

  async initBrandsState(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      BrandActions.loadBrands(),
      BrandActionEnum.loadBrands,
    );
  }

  getBrands(): Observable<IBrand[]> {
    return this.store.select(BrandSelectors.selectBrands)
      .pipe(filter(Boolean));
  }
}
