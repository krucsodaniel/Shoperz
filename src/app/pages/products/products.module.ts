import { isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ProductCardComponent,
  ProductDashboardComponent,
  ViewPanelComponent,
  ViewSwitchComponent,
  ProductsSortingComponent,
  FilterPanelComponent,
  FilterCardComponent,
  ProductNotFoundComponent,
  ProductPageComponent,
} from './components';
import {
  ProductService,
  ProductFacadeService,
  CardStateService,
  CategoryService,
  CategoryFacadeService,
  BrandService,
  BrandFacadeService,
  FilterService,
  FilterFacadeService,
  SortFacadeService,
} from './services';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productReducer, productsFeatureKey } from './store/products/product.reducer';
import { brandReducer, brandsFeatureKey } from './store/brands/brand.reducer';
import { categoryReducer, categoriesFeatureKey } from './store/categories/category.reducer';
import { filterReducer, filtersFeatureKey } from './store/filters/filter.reducer';
import { ProductEffects } from './store/products/product.effects';
import { BrandEffects } from './store/brands/brand.effects';
import { CategoryEffects } from './store/categories/category.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(productsFeatureKey, productReducer),
    StoreModule.forFeature(brandsFeatureKey, brandReducer),
    StoreModule.forFeature(categoriesFeatureKey, categoryReducer),
    StoreModule.forFeature(filtersFeatureKey, filterReducer),
    EffectsModule.forFeature([ProductEffects, BrandEffects, CategoryEffects,]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  declarations: [
    ProductCardComponent,
    ProductDashboardComponent,
    ViewPanelComponent,
    ViewSwitchComponent,
    ProductsSortingComponent,
    FilterPanelComponent,
    FilterCardComponent,
    ProductNotFoundComponent,
    ProductPageComponent,
  ],
  providers: [
    ProductService,
    ProductFacadeService,
    CardStateService,
    CategoryService,
    CategoryFacadeService,
    BrandService,
    BrandFacadeService,
    FilterService,
    FilterFacadeService,
    SortFacadeService,
  ],
  exports: [
    ProductCardComponent,
    ProductDashboardComponent,
    ViewPanelComponent,
    ViewSwitchComponent,
    ProductsSortingComponent,
  ],
})
export class ProductsModule {}
