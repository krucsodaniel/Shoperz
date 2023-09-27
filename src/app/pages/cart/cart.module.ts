import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent, CartItemComponent, CartSummaryComponent } from './components';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    DigitOnlyModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  declarations: [
    // CartComponent,
    CartItemComponent,
    CartSummaryComponent,
  ],
  exports: [
    CartItemComponent,
    CartSummaryComponent
  ]
})
export class CartModule {}
