import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FilterCardComponent,
  ProductCardComponent,
  ProductDashboardComponent,
  ViewPanelComponent,
  ViewSwitchComponent,
} from './components';
import { ProductService, ProductFacadeService, CardStateService, } from './services';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    FilterCardComponent,
    ProductCardComponent,
    ProductDashboardComponent,
    ViewPanelComponent,
    ViewSwitchComponent,
  ],
  declarations: [
    FilterCardComponent,
    ProductCardComponent,
    ProductDashboardComponent,
    ViewPanelComponent,
    ViewSwitchComponent,
  ],
  providers: [
    ProductService,
    ProductFacadeService,
    CardStateService,
  ],
})
export class ProductsModule {}
