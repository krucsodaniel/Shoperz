import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ICalculatedProduct } from '@shared-module';

@Component({
  selector: 'app-wishlist-card',
  templateUrl: './wishlist-card.component.html',
  styleUrls: ['./wishlist-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistCardComponent {
  @Input()
  wishlistItem: ICalculatedProduct;

  @HostBinding('class')
  private readonly classes = 'flex flex-col md:flex-row items-center md:justify-around gap-3 w-full min-h-66 active:outline-0 py-4 rounded-md border-2 border-grey-300 shadow-md hover:shadow-xl duration-300';

  buildTranslationKey(relativeKey: string): string {
    return `orders.${ relativeKey }`;
  }
}
