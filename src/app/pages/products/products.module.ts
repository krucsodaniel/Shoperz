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
  ProductPageComponent,
} from './components';
import { CardStateService } from './services';

import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DigitOnlyModule } from '@uiowa/digit-only';
import { SvgIconsModule } from '@core-module';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@shared-module';

const routes: Routes = [
  { path: '', component: ProductDashboardComponent },
  { path: Route.productById, component: ProductPageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    DigitOnlyModule,
    SvgIconsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ProductCardComponent,
    ProductDashboardComponent,
    ViewPanelComponent,
    ViewSwitchComponent,
    ProductsSortingComponent,
    FilterPanelComponent,
    ProductPageComponent,
  ],
  providers: [
    CardStateService,
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
