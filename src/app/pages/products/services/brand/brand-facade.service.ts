import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, firstValueFrom, Observable } from 'rxjs';
import { IBrand } from 'src/shared/models';
import { BrandService } from './brand.service';

@Injectable()
export class BrandFacadeService {
  private readonly brands$ = new BehaviorSubject<IBrand[]>(undefined);

  constructor(private brandService: BrandService) {}

  async initBrands(): Promise<void> {
    if (!this.brands$.value) {
      const brands = await firstValueFrom(this.brandService.getBrands());
      this.brands$.next(brands);
    }
  }

  getBrands(): Observable<IBrand[]> {
    return this.brands$.pipe(filter(Boolean));
  }
}
