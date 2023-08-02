import { NgModule } from '@angular/core';
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
  ProductFilterService,
} from './services';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
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
    ProductFilterService
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
