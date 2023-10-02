import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { IOrder } from '@shared-module';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderItemComponent {
  @Input()
  order: IOrder;

  @HostBinding('class')
  private readonly classes = 'flex flex-col md:flex-row items-center md:justify-around gap-3 w-full md:w-10/12 min-h-66 active:outline-0 py-4 my-4 rounded-md border-2 border-grey-300 shadow-md hover:shadow-xl duration-300';

  buildTranslationKey(relativeKey: string): string {
    return `orders.${ relativeKey }`;
  }

  buildOrderStatusTranslationKey(relativeKey: string): string {
    return `orders.orderStatuses.${ relativeKey }`;
  }
}
