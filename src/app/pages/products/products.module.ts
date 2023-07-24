import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  FilterCardComponent,
  ProductCardComponent,
  ProductDashboardComponent,
  ViewPanelComponent,
  ViewSwitchComponent,
  ProductsSortingComponent,
} from './components';
import { ProductService, ProductFacadeService, CardStateService } from './services';
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
  exports: [
    FilterCardComponent,
    ProductCardComponent,
    ProductDashboardComponent,
    ViewPanelComponent,
    ViewSwitchComponent,
    ProductsSortingComponent,
  ],
  declarations: [
    FilterCardComponent,
    ProductCardComponent,
    ProductDashboardComponent,
    ViewPanelComponent,
    ViewSwitchComponent,
    ProductsSortingComponent,
  ],
  providers: [
    ProductService,
    ProductFacadeService,
    CardStateService,
  ],
})
export class ProductsModule {}
