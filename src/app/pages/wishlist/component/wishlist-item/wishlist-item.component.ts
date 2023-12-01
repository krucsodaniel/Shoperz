import { Component, HostBinding, Input } from '@angular/core';
import { ICalculatedProduct, IOrder } from '@shared-module';

@Component({
  selector: 'app-wishlist-item',
  templateUrl: './wishlist-item.component.html',
  styleUrls: ['./wishlist-item.component.scss']
})
export class WishlistItemComponent {
  @Input()
  order: IOrder;
  @Input()
  favourite: ICalculatedProduct;

  @HostBinding('class')
  private readonly classes = 'flex flex-col md:flex-row items-center md:justify-around gap-3 w-full md:w-10/12 min-h-66 active:outline-0 py-4 my-4 rounded-md border-2 border-grey-300 shadow-md hover:shadow-xl duration-300';

  buildTranslationKey(relativeKey: string): string {
    return `orders.${ relativeKey }`;
  }
}
