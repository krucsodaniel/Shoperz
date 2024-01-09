import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { IOrder, OrdersFacadeService } from '@shared-module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  orders$: Observable<IOrder[]>;

  readonly headerTranslationKeys = ['orderId', 'products', 'total', 'status'];

  @HostBinding('class')
  private readonly classes = 'mx-auto flex items-start flex-wrap py-16 gap-8';

  constructor(private ordersFacadeService: OrdersFacadeService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersFacadeService.getOrderProducts();
  }

  buildTranslationKey(relativeKey: string): string {
    return `orders.${ relativeKey }`;
  }
}
