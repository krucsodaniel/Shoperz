import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/shared/shared.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

import { Route } from '@shared-module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SvgIconsModule, TranslationConfigModule } from '../core';
import { TranslateModule } from '@ngx-translate/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: Route.base, redirectTo: Route.products, pathMatch: 'full' },
  {
    path: Route.products,
    loadChildren: () => import('./pages/products/products.module').then(({ ProductsModule }) => ProductsModule),
  },
  {
    path: Route.productById,
    loadChildren: () => import('./pages/products/products.module').then(({ ProductsModule }) => ProductsModule),
  },
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
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
