import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WishlistFacadeService } from '../../services';

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistButtonComponent {
  @Input()
  productId: string;
  @Input()
  isOnProductPage: boolean;
  @Input()
  isProductOnWishlist: boolean;

  constructor(private wishlistFacadeService: WishlistFacadeService) {}

  async toggleProductInWishlist(productId: string, event: Event) {
    event.stopPropagation();
    this.wishlistFacadeService.addToWishlist(productId);
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }
}
