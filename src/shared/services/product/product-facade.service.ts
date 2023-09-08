import { Injectable } from '@angular/core';
import { BrandFacadeService, CategoryFacadeService, ProductService, SearchFacadeService } from '../../services';
import { FilterService, FilterFacadeService, SortFacadeService } from 'src/app/pages/products/services';
import { filter, firstValueFrom, Observable } from 'rxjs';
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

  areAllInitialized(): Observable<boolean> {
    return this.store.select(ProductSelectors.selectAreAllInitialized);
  }

  isSpecificInitialized(): Observable<boolean> {
    return this.store.select(ProductSelectors.selectIsSpecificInitialized);
  }

  async initProductsState(): Promise<void> {
    const areAllInitialized = await firstValueFrom(this.areAllInitialized());
    const isSpecificInitialized = await firstValueFrom(this.isSpecificInitialized());

    if (!areAllInitialized && !isSpecificInitialized) {
      const products = await firstValueFrom(this.getProducts());

      if (!products) {
        this.store.dispatch(ProductActions.loadProducts());
        this.brandFacadeService.initBrandsState();
        this.categoryFacadeService.initCategoriesState();
        this.filterService.initializeFilterDefinitions();
        return;
      }

      return;
    }

    if (!areAllInitialized && isSpecificInitialized) {
      this.store.dispatch(ProductActions.loadProducts());
      this.filterService.initializeFilterDefinitions();
      this.searchFacadeService.setSearchValue('');
      return;
    }
  }

  async initProductState(productId: number): Promise<void> {
    const areAllInitialized = await firstValueFrom(this.areAllInitialized());

    if (areAllInitialized) {
      const product = await firstValueFrom(this.getSingleProduct(productId));

      if (!product) {
        this.store.dispatch(ProductActions.loadProductById({ productId }));
        await firstValueFrom(this.isSpecificInitialized().pipe(filter(Boolean)));
      }

      return;
    }

    this.store.dispatch(ProductActions.loadProductById({ productId }));
    this.brandFacadeService.initBrandsState();
    this.categoryFacadeService.initCategoriesState();
    await firstValueFrom(this.isSpecificInitialized().pipe(filter(Boolean)));
  }

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.store.select(ProductSelectors.getCalculatedProducts);
  }

  getSingleProduct(productId: number): Observable<ICalculatedProduct> {
    return this.store.select(ProductSelectors.getCalculatedProduct(productId))
      .pipe(filter(Boolean));
  }

  resetFiltering(): void {
    this.searchFacadeService.setSearchValue('');
    this.sortFacadeService.setSortingOption(SortingOption.default);
    this.filterFacadeService.resetFilter();
  }
}
