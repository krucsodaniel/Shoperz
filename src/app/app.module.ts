import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/shared/shared.module';
import { ProductsModule } from 'src/app/pages/products/products.module';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductDashboardComponent, ProductPageComponent } from './pages/products/components';

import { Route } from 'src/shared/enums'

const routes: Routes = [
  { path: Route.base, redirectTo: Route.products, pathMatch: 'full' },
  { path: Route.products, component: ProductDashboardComponent },
  { path: Route.productById, component: ProductPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ProductsModule,
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
