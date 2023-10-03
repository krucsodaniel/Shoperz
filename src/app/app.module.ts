import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/shared/shared.module';
import { ProductsModule } from './pages/products/products.module';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent, ProductPageComponent } from './pages/products/components';

import { Route } from '@shared-module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SvgIconsModule, TranslationConfigModule } from '../core';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  { path: Route.base, redirectTo: Route.products, pathMatch: 'full' },
  { path: Route.products, component: ProductDashboardComponent },
  { path: Route.productById, component: ProductPageComponent },
  {
    path: Route.cart,
    loadChildren: () => import('./pages/cart/cart.module').then(({ CartModule }) => CartModule),
  },
  {
    path: Route.orders,
    loadChildren: () => import('./pages/orders/orders.module').then(({ OrdersModule }) => OrdersModule),
  },
  {
    path: Route.about,
    loadChildren: () => import('./pages/about-us/about-us.module').then(({ AboutUsModule }) => AboutUsModule),
  },
];

@NgModule({
  imports: [
    BrowserModule,
    ProductsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TranslationConfigModule,
    SvgIconsModule.forRoot(),
    TranslateModule,
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
