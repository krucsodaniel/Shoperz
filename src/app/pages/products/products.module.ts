import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FilterCardComponent,
  ProductCardComponent,
  ProductDashboardComponent,
} from './components';
import { ProductService, ProductFacadeService, } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    FilterCardComponent,
    ProductCardComponent,
    ProductDashboardComponent,
  ],
  declarations: [
    FilterCardComponent,
    ProductCardComponent,
    ProductDashboardComponent,
  ],
  providers: [
    ProductService,
    ProductFacadeService,
  ],
})
export class ProductsModule {}
