import { Injectable } from '@angular/core';
import {
  BrandFacadeService,
  CategoryFacadeService,
  ProductService,
  ProductFilterService
} from '../index';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, map, Observable } from 'rxjs';
import { IBrand, ICategory, IProduct, ICalculatedProduct } from 'src/shared/models';

@Injectable()
export class ProductFacadeService {
  private readonly products$ = new BehaviorSubject<IProduct[]>(undefined);

  constructor(
    private productService: ProductService,
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private productFilterService: ProductFilterService,
  ) {}

  async initProducts(): Promise<void> {
    if (!this.products$.value) {
      const products = await firstValueFrom(this.productService.getProducts());
      this.products$.next(products);
    }
  }

  initData() {
    this.initProducts();
    this.categoryFacadeService.initCategories();
    this.brandFacadeService.initBrands();
    this.productFilterService.initializeFilter();
  }

  getProducts(): Observable<ICalculatedProduct[]> {
    return combineLatest([
      this.products$.pipe(filter(Boolean)),
      this.categoryFacadeService.getCategories(),
      this.brandFacadeService.getBrands(),
    ]).pipe(
      map(([products, categories, brands]: [ICalculatedProduct[], ICategory[], IBrand[]]) => {
        return products.map((product: ICalculatedProduct) => {
          const category = categories.find((category) => category.id === product.categoryId);
          const brand = brands.find((brand) => brand.id === product.brandId);

          return {
            ...product,
            categoryName: category.name,
            brandName: brand.name,
          };
        });
      })
    );
  }
}
