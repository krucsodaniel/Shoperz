import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/shared/shared.module';
import { ProductsModule } from './pages/products/products.module';
import { CartModule } from './pages/cart/cart.module';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent, ProductPageComponent } from './pages/products/components';
import { CartComponent } from './pages/cart';

import { Route } from '@shared-module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AboutUsModule } from './pages/about-us/about-us.module';
import { AboutUsComponent } from './pages/about-us';

const routes: Routes = [
  { path: Route.base, redirectTo: Route.products, pathMatch: 'full' },
  { path: Route.products, component: ProductDashboardComponent },
  { path: Route.productById, component: ProductPageComponent },
  { path: Route.cart, component: CartComponent },
  { path: Route.about, component: AboutUsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    CartModule,
    AboutUsModule,
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
