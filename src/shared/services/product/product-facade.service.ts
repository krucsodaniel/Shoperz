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
import { filter, Observable } from 'rxjs';
import { ICalculatedProduct } from '../../models';
import { Store } from '@ngrx/store';
import { ProductActions, ProductSelectors } from '../../store';
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

  async initProducts(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      ProductActions.loadProducts(),
      ProductActionKey.loadProducts,
    );
  }

  async initProductById(productId: string): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      ProductActions.loadProductById({ productId }),
      ProductActionKey.loadProductById,
    );
  }

  getProducts(): Observable<ICalculatedProduct[]> {
    return this.store.select(ProductSelectors.getCalculatedProducts);
  }

  getSingleProduct(productId: string): Observable<ICalculatedProduct> {
    return this.store.select(ProductSelectors.getCalculatedProduct(productId))
      .pipe(filter(Boolean));
  }

  getTotalAmountOnWishlist(): Observable<number> {
    return this.store.select(ProductSelectors.selectTotalNumberOnWishlist);
  }
}
