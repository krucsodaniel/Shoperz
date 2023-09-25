import { Injectable } from '@angular/core';
import {
  BrandFacadeService,
  CartFacadeService,
  CategoryFacadeService,
  ProductService,
  SearchFacadeService,
} from '../../services';
import { FilterService, FilterFacadeService, SortFacadeService } from 'src/app/pages/products/services';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { SortingOption } from '../../enums';
import { ICalculatedProduct } from '../../models';
import { Store } from '@ngrx/store';
import { ProductActions, ProductSelectors } from '../../store';
import { CartActions } from '../../store/cart/cart.actions';

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
    private cartFacadeService: CartFacadeService,
    private store: Store,
  ) {}

  isProductsPageInitialized(): Observable<boolean> {
    return this.store.select(ProductSelectors.selectAreAllInitialized);
  }

  isSpecificProductPageInitialized(): Observable<boolean> {
    return this.store.select(ProductSelectors.selectIsSpecificInitialized);
  }

  async initProductsPage(): Promise<void> {
    const isProductsPageInitialized = await firstValueFrom(this.isProductsPageInitialized());
    const isSpecificProductPageInitialized = await firstValueFrom(this.isSpecificProductPageInitialized());

    if (!isProductsPageInitialized && !isSpecificProductPageInitialized) {
      const products = await firstValueFrom(this.getProducts());

      if (!products) {
        this.store.dispatch(ProductActions.loadProducts());
        this.brandFacadeService.initBrandsState();
        this.categoryFacadeService.initCategoriesState();
        await this.filterService.initializeFilterDefinitions();
        this.initCartState();
        return;
      }

      return;
    }

    if (!isProductsPageInitialized && isSpecificProductPageInitialized) {
      this.store.dispatch(ProductActions.loadProducts());
      await this.filterService.initializeFilterDefinitions();
      this.initCartState();
      return;
    }
  }

  async initSpecificProductPage(productId: number): Promise<void> {
    const isProductsPageInitialized = await firstValueFrom(this.isProductsPageInitialized());

    if (isProductsPageInitialized) {
      const product = await firstValueFrom(this.getSingleProduct(productId));

      if (!product) {
        this.store.dispatch(ProductActions.loadProductById({ productId }));
        await firstValueFrom(this.isSpecificProductPageInitialized().pipe(filter(Boolean)));
      }

      return;
    }

    this.store.dispatch(ProductActions.loadProductById({ productId }));
    this.brandFacadeService.initBrandsState();
    this.categoryFacadeService.initCategoriesState();
    await firstValueFrom(this.isSpecificProductPageInitialized().pipe(filter(Boolean)));
    this.store.dispatch(CartActions.initCart());
  }

  async initCartPage(): Promise<void> {
    const isProductsPageInitialized = await firstValueFrom(this.isProductsPageInitialized());
    const isSpecificProductPageInitialized = await firstValueFrom(this.isSpecificProductPageInitialized());

    if (!isProductsPageInitialized) {
      const products = await firstValueFrom(this.getProducts());

      if (!products) {
        this.store.dispatch(ProductActions.loadProducts());
        this.brandFacadeService.initBrandsState();
        this.categoryFacadeService.initCategoriesState();
        this.filterService.initializeFilterDefinitions();
        this.initCartState();
        return;
      }

      return;
    }

    if (!isProductsPageInitialized && isSpecificProductPageInitialized) {
      this.store.dispatch(ProductActions.loadProducts());
      await this.filterService.initializeFilterDefinitions();
      this.initCartState();
      return;
    }
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

  initCartState(): void {
    this.cartFacadeService.initCartState();
  }
}
