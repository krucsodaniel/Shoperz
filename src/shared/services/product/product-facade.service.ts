import { Injectable } from '@angular/core';
import { BrandFacadeService, CategoryFacadeService, ProductService, SearchFacadeService } from '../../services';
import { FilterService, FilterFacadeService, SortFacadeService } from 'src/app/pages/products/services';
import { filter, map, Observable } from 'rxjs';
import { SortingOption } from '../../enums';
import { ICalculatedProduct } from '../../models';
import { Store } from '@ngrx/store';
import { ProductActions, ProductSelectors } from '../../store';

@Injectable()
export class ProductFacadeService {
  constructor(
    private productService: ProductService,
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private filterService: FilterService,
    private filterFacadeService: FilterFacadeService,
    private searchFacadeService: SearchFacadeService,
    private sortFacadeService: SortFacadeService,
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

  resetFiltering(): void {
    this.searchFacadeService.setSearchValue('');
    this.sortFacadeService.setSortingOption(SortingOption.default);
    this.filterFacadeService.resetFilter();
  }
}
