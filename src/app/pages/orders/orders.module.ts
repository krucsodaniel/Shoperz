import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent, OrderItemComponent } from './components';
import { SharedModule } from 'src/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: OrdersComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    OrdersComponent,
    OrderItemComponent,
  ],
})
export class OrdersModule {}
