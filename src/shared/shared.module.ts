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
import { ProductEffects } from './store/products/product.effects';
import { BrandEffects } from './store/brands/brand.effects';
import { CategoryEffects } from './store/categories/category.effects';
import { CartEffects } from './store/cart/cart.effects';
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
} from './services';
import {
  SearchbarComponent,
  LoaderComponent,
  CartIconComponent,
  BadgeComponent,
  FooterComponent,
  HeaderComponent,
  TopHeaderComponent,
  SubHeaderComponent,
  MiddleHeaderComponent,
} from './components';
import { SvgIconsModule } from '../core';

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
    EffectsModule.forFeature([ProductEffects, BrandEffects, CategoryEffects, CartEffects]),
    RouterLinkActive,
    SvgIconsModule,
  ],
  declarations: [
    SearchbarComponent,
    LoaderComponent,
    CartIconComponent,
    BadgeComponent,
    FooterComponent,
    HeaderComponent,
    TopHeaderComponent,
    MiddleHeaderComponent,
    SubHeaderComponent,
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
  ],
  exports: [
    SearchbarComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
