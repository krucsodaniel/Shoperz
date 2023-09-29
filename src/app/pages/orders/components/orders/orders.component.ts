import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import { IOrder, OrdersFacadeService, ProductFacadeService } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];

  private readonly destroyRef = inject(DestroyRef);

  @HostBinding('class')
  private readonly classes = 'mx-auto flex items-start flex-wrap py-16 gap-8';

  constructor(
    private ordersFacadeService: OrdersFacadeService,
    private productsFacadeService: ProductFacadeService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.productsFacadeService.initOrdersPage();

    this.ordersFacadeService.getOrderProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((orders: IOrder[]) => {
        this.orders = orders;
        this.cdr.detectChanges();
      });
  }

  buildTranslationKey(relativeKey: string): string {
    return `orders.${ relativeKey }`;
  }
}
