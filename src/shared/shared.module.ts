import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent,FooterComponent, HeaderComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class SharedModule {}
