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
  CardStateService,
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

import { filterReducer, filtersFeatureKey } from './store/filters/filter.reducer';
import { FilterEffects } from './store';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SvgIconsModule } from '../../../core';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(filtersFeatureKey, filterReducer),
    EffectsModule.forFeature([FilterEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    DigitOnlyModule,
    SvgIconsModule,
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
    CardStateService,
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
