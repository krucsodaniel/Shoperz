import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/shared/shared.module';
import { ProductsModule } from 'src/app/pages/products/products.module';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

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
