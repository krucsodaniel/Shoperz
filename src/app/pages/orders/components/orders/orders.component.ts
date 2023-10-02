import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { IOrder, OrdersFacadeService, ProductFacadeService } from '@shared-module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  orders: Observable<IOrder[]>;

  readonly headerTexts = ['orderId', 'products', 'total', 'status', 'dateCreated'];

  @HostBinding('class')
  private readonly classes = 'mx-auto flex items-start flex-wrap py-16 gap-8';

  constructor(
    private ordersFacadeService: OrdersFacadeService,
    private productsFacadeService: ProductFacadeService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.productsFacadeService.initOrdersPage();

    this.orders = this.ordersFacadeService.getOrderProducts();

    this.cdr.detectChanges();
  }

  buildTranslationKey(relativeKey: string): string {
    return `orders.${ relativeKey }`;
  }
}
