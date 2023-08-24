import { Injectable } from '@angular/core';
import {
  BrandFacadeService,
  CategoryFacadeService,
  FilterFacadeService,
  ProductService,
  FilterService
} from '../../services';
import { filter, map, Observable } from 'rxjs';
import { ICalculatedProduct } from '@shared-module';
import { Store } from '@ngrx/store';
import {
  ProductActions,
  ProductSelectors,
} from '../../store';

@Injectable()
export class ProductFacadeService {
  constructor(
    private productService: ProductService,
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private filterService: FilterService,
    private filterFacadeService: FilterFacadeService,
    private store: Store,
  ) {}

  initProductsState(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  initStates() {
    this.initProductsState();
    this.brandFacadeService.initBrandsState();
    this.categoryFacadeService.initCategoriesState();
    this.filterService.initializeFilterDefinitions();
  }

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.store.select(ProductSelectors.getCalculatedProducts)
      .pipe(filter(Boolean));
  }

  getProductById(productId: number): Observable<ICalculatedProduct | undefined> {
    return this.getProducts()
      .pipe(
        map((products: ICalculatedProduct[]) => products.find((product) => product.id === productId))
      );
  }
}
