import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { productReducer, productsFeatureKey } from './store/products/product.reducer';
import { brandReducer, brandsFeatureKey } from './store/brands/brand.reducer';
import { categoryReducer, categoriesFeatureKey } from './store/categories/category.reducer';
import { cartReducer, cartFeatureKey } from './store/cart/cart.reducer';
import { feedbackReducer, feedbackFeatureKey } from './store/feedback';
import { ordersReducer, ordersFeatureKey } from './store/orders/orders.reducer';
import { filterReducer, filtersFeatureKey } from './store/filters/filter.reducer';
import { ProductEffects } from './store/products/product.effects';
import { BrandEffects } from './store/brands/brand.effects';
import { CategoryEffects } from './store/categories/category.effects';
import { CartEffects } from './store/cart/cart.effects';
import { FeedbackEffects } from './store/feedback';
import { OrdersEffects } from './store/orders/orders.effects';
import { FilterEffects } from './store/filters/filter.effect';
import {
  BrandService,
  BrandFacadeService,
  CategoryService,
  CategoryFacadeService,
  ProductService,
  ProductFacadeService,
  ProductsManipulationService,
  CartService,
  CartFacadeService,
  ToastService,
  SearchFacadeService,
  FeedbackService,
  FeedbackFacadeService,
  OrdersService,
  OrdersFacadeService,
  FilterFacadeService,
  FilterService,
  SortFacadeService,
  WishlistService,
  WishlistFacadeService,
  ActionDispatcherService,
  ActionTrackerService,
} from './services';
import {
  SearchbarComponent,
  LoaderComponent,
  NavIconComponent,
  BadgeComponent,
  FooterComponent,
  HeaderComponent,
  TopHeaderComponent,
  SubHeaderComponent,
  MiddleHeaderComponent,
  WishlistButtonComponent,
  GeneralAddToCartIconComponent,
  ProductPageAddToCartIconComponent,
} from './components';
import { SvgIconsModule } from '@core-module';
import { FirestoreDatePipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterLink,
    StoreModule.forFeature(productsFeatureKey, productReducer),
    StoreModule.forFeature(brandsFeatureKey, brandReducer),
    StoreModule.forFeature(categoriesFeatureKey, categoryReducer),
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    StoreModule.forFeature(feedbackFeatureKey, feedbackReducer),
    StoreModule.forFeature(ordersFeatureKey, ordersReducer),
    StoreModule.forFeature(filtersFeatureKey, filterReducer),
    EffectsModule.forFeature([
      ProductEffects,
      BrandEffects,
      CategoryEffects,
      CartEffects,
      OrdersEffects,
      FilterEffects,
      FeedbackEffects,
    ]),
    RouterLinkActive,
    SvgIconsModule,
  ],
  declarations: [
    SearchbarComponent,
    LoaderComponent,
    NavIconComponent,
    BadgeComponent,
    FooterComponent,
    HeaderComponent,
    TopHeaderComponent,
    MiddleHeaderComponent,
    SubHeaderComponent,
    WishlistButtonComponent,
    GeneralAddToCartIconComponent,
    FirestoreDatePipe,
    ProductPageAddToCartIconComponent,
  ],
  providers: [
    SearchFacadeService,
    ProductService,
    ProductFacadeService,
    CategoryService,
    CategoryFacadeService,
    BrandService,
    BrandFacadeService,
    ProductsManipulationService,
    CartService,
    CartFacadeService,
    ToastService,
    FeedbackService,
    FeedbackFacadeService,
    OrdersService,
    OrdersFacadeService,
    FilterFacadeService,
    FilterService,
    SortFacadeService,
    WishlistService,
    WishlistFacadeService,
    ActionDispatcherService,
    ActionTrackerService,
  ],
  exports: [
    SearchbarComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    WishlistButtonComponent,
    GeneralAddToCartIconComponent,
    FirestoreDatePipe,
    ProductPageAddToCartIconComponent,
  ],
})
export class SharedModule {}
