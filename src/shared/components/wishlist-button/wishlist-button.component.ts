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
  isProductOnList: boolean;

  constructor(private wishlistFacadeService: WishlistFacadeService) {}

  toggleProductOnWishlist(productId: string, event: Event): void {
    event.stopPropagation();
    this.wishlistFacadeService.toggleOnWishlist(productId, !this.isProductOnList);
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }
}
