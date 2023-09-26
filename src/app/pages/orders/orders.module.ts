import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderItemComponent } from './components';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    OrdersComponent,
    OrderItemComponent,
  ],
})
export class OrdersModule {}
