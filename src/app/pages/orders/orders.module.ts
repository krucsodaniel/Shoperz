import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderItemComponent } from './components';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [
    OrdersComponent,
    OrderItemComponent,
  ],
})
export class OrdersModule {}
