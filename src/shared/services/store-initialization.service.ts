import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { ProductSelectors } from '../store';
import { CategoryFacadeService } from './category';
import { BrandFacadeService } from './brand';
import { FilterService } from './filter.service';
import { FilterFacadeService } from './filter-facade.service';
import { SearchFacadeService } from './search-facade.service';
import { SortFacadeService } from './sort-facade.service';
import { CartFacadeService } from './cart';
import { OrdersFacadeService } from './orders';
import { ActionDispatcherService } from './action-dispatcher.service';
import { UserFacadeService } from './user';
import { ProductFacadeService } from './product';

@Injectable()
export class StoreInitializationService {
  constructor(
    private store: Store,
    private actionDispatcherService: ActionDispatcherService,
    private productFacadeService: ProductFacadeService,
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private filterService: FilterService,
    private filterFacadeService: FilterFacadeService,
    private searchFacadeService: SearchFacadeService,
    private sortFacadeService: SortFacadeService,
    private cartFacadeService: CartFacadeService,
    private ordersFacadeService: OrdersFacadeService,
    private userFacadeService: UserFacadeService,
  ) {}

  isProductsPageInitialized(): Observable<boolean> {
    return this.store.select(ProductSelectors.selectAreAllInitialized);
  }

  async initializeStore(): Promise<void> {
    const isProductsPageInitialized = await firstValueFrom(this.isProductsPageInitialized());

    if (!isProductsPageInitialized) {
      this.initializeStates();
    }
  }

  private initializeStates(): void {
    this.productFacadeService.initProducts();
    this.brandFacadeService.initBrandsState();
    this.categoryFacadeService.initCategoriesState();
    this.filterService.initializeFilterDefinitions();
    this.cartFacadeService.initCartState();
    this.ordersFacadeService.initOrdersState();
    this.userFacadeService.initUserState();
  }
}
