import { Injectable } from '@angular/core';
import {
  ActionDispatcherService,
  BrandFacadeService,
  CartFacadeService,
  CategoryFacadeService,
  OrdersFacadeService,
  SearchFacadeService,
  FilterService,
  FilterFacadeService,
  SortFacadeService,
} from '../../services';
import { filter, firstValueFrom, Observable } from 'rxjs';
import { ICalculatedProduct } from '../../models';
import { Store } from '@ngrx/store';
import { ProductActions, ProductSelectors, CartActions } from '../../store';
import { ProductActionKey } from '../../enums';

@Injectable()
export class ProductFacadeService {
  constructor(
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private filterService: FilterService,
    private filterFacadeService: FilterFacadeService,
    private searchFacadeService: SearchFacadeService,
    private sortFacadeService: SortFacadeService,
    private cartFacadeService: CartFacadeService,
    private ordersFacadeService: OrdersFacadeService,
    private store: Store,
    private actionDispatcherService: ActionDispatcherService,
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
        this.initProducts();
        this.brandFacadeService.initBrandsState();
        this.categoryFacadeService.initCategoriesState();
        this.filterService.initializeFilterDefinitions();
        this.initCartState();
        this.initOrdersState();
        return;
      }

      return;
    }

    if (!isProductsPageInitialized && isSpecificProductPageInitialized) {
      this.initProducts();
      this.filterService.initializeFilterDefinitions();
      this.initCartState();
      this.initOrdersState();
      return;
    }
  }

  async initSpecificProductPage(productId: string): Promise<void> {
    const isProductsPageInitialized = await firstValueFrom(this.isProductsPageInitialized());

    if (isProductsPageInitialized) {
      const product = await firstValueFrom(this.getSingleProduct(productId));

      if (!product) {
        this.loadProductById(productId);
        await firstValueFrom(this.isSpecificProductPageInitialized().pipe(filter(Boolean)));
      }

      return;
    }

    this.store.dispatch(ProductActions.loadProductById({ productId }));
    this.brandFacadeService.initBrandsState();
    this.categoryFacadeService.initCategoriesState();
    await firstValueFrom(this.isSpecificProductPageInitialized().pipe(filter(Boolean)));
    this.store.dispatch(CartActions.initCart());
    this.initOrdersState();
  }

  async initProducts(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      ProductActions.loadProducts(),
      ProductActionKey.loadProducts,
    );
  }

  async loadProductById(productId: number): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      ProductActions.loadProductById({ productId }),
      ProductActionKey.loadProductById,
    );
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
        this.initOrdersState();
        return;
      }

      return;
    }

    if (!isProductsPageInitialized && isSpecificProductPageInitialized) {
      this.store.dispatch(ProductActions.loadProducts());
      await this.filterService.initializeFilterDefinitions();
      this.initCartState();
      this.initOrdersState();
      return;
    }
  }

  async initOrdersPage(): Promise<void> {
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
        this.initOrdersState();
        return;
      }

      return;
    }

    if (!isProductsPageInitialized && isSpecificProductPageInitialized) {
      this.store.dispatch(ProductActions.loadProducts());
      await this.filterService.initializeFilterDefinitions();
      this.initCartState();
      this.initOrdersState();
      return;
    }
  }

  initCartState(): void {
    this.cartFacadeService.initCartState();
  }

  initOrdersState(): void {
    this.ordersFacadeService.initOrdersState();
  }

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.store.select(ProductSelectors.getCalculatedProducts);
  }

  getSingleProduct(productId: string): Observable<ICalculatedProduct> {
    return this.store.select(ProductSelectors.getCalculatedProduct(productId))
      .pipe(filter(Boolean));
  }
}
