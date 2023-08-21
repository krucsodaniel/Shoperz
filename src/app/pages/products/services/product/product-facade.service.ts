import { Injectable } from '@angular/core';
import {
  BrandFacadeService,
  CategoryFacadeService,
  ProductService,
} from '../index';
import { filter, map, Observable } from 'rxjs';
import { ICalculatedProduct } from 'src/shared/models';
import { Store } from '@ngrx/store';
import {
  ProductActions,
  ProductSelectors,
} from '../../store';
import { FilterService } from '../filter/';

@Injectable()
export class ProductFacadeService {
  constructor(
    private productService: ProductService,
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private filterService: FilterService,
    private store: Store,
  ) {}

  initProductsState(): void {
    this.store.dispatch(ProductActions.loadProducts());
  }

  initStates() {
    this.initProductsState();
    this.brandFacadeService.initBrandsState();
    this.categoryFacadeService.initCategoriesState();
    this.filterService.initializeFilter();
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
