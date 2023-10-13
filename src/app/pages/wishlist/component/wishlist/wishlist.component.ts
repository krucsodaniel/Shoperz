import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent {
  readonly headerTranslationKeys = ['picture', 'product', 'price', 'operations'];

  buildTranslationKey(relativeKey: string): string {
    return `wishlistPage.${ relativeKey }`;
  }
}
