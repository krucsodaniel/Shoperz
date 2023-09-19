import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  NavbarComponent,
  HeaderComponent,
  SvgIconComponent,
  SearchbarComponent,
  LoaderComponent,
  CartIconComponent,
  BadgeComponent,
} from './components';
import { SpriteLoaderService, SvgService, TranslationLoaderService, SearchFacadeService, } from './services';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { productReducer, productsFeatureKey } from './store/products/product.reducer';
import { brandReducer, brandsFeatureKey } from './store/brands/brand.reducer';
import { categoryReducer, categoriesFeatureKey } from './store/categories/category.reducer';
import { cartReducer, cartFeatureKey } from './store/cart/cart.reducer';
import { ProductEffects } from './store/products/product.effects';
import { BrandEffects } from './store/brands/brand.effects';
import { CategoryEffects } from './store/categories/category.effects';
import { CartEffects } from './store/cart/cart.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
} from './services';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    RouterLink,
    StoreModule.forFeature(productsFeatureKey, productReducer),
    StoreModule.forFeature(brandsFeatureKey, brandReducer),
    StoreModule.forFeature(categoriesFeatureKey, categoryReducer),
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([ProductEffects, BrandEffects, CategoryEffects, CartEffects]),
  ],
  exports: [
    NavbarComponent,
    HeaderComponent,
    SvgIconComponent,
    SearchbarComponent,
    LoaderComponent,
  ],
  declarations: [
    NavbarComponent,
    HeaderComponent,
    SvgIconComponent,
    SearchbarComponent,
    LoaderComponent,
    CartIconComponent,
    BadgeComponent,
  ],
  providers: [
    SpriteLoaderService,
    {
      provide: 'SVG_SPRITE_PATH',
      useValue: './assets/sprite/svg-sprite.svg',
    },
    TranslationLoaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: (translationLoader: TranslationLoaderService) => () => translationLoader.loadTranslation(),
      deps: [TranslationLoaderService],
      multi: true,
    },
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
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [SvgService],
    };
  }
}
