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
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCX-QhUKmVOMy5dE7jUXI8rMnk1zfvHCCA",
  authDomain: "shoperz-7ff36.firebaseapp.com",
  projectId: "shoperz-7ff36",
  storageBucket: "shoperz-7ff36.appspot.com",
  messagingSenderId: "561182531709",
  appId: "1:561182531709:web:4c4e93e349cc05644f9114"
}; // TODO: Put it in another file, dotenv, gitignore

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
