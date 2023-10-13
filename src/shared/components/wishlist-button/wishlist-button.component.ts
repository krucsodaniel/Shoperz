import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { WishlistFacadeService } from '../../services';

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrls: ['./wishlist-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistButtonComponent implements OnInit{
  @Input()
  productId: number;
  @Input()
  isOnProductPage: boolean;

  constructor( private wishlistFacadeService: WishlistFacadeService,
               private cdr: ChangeDetectorRef,
               ) {}

  async ngOnInit(): Promise<void> {
    this.cdr.detectChanges();
    this.wishlistFacadeService.getAllItemsOnWishlist()
      .subscribe((wishlist) => console.log(wishlist))

  }

  async toggleProductToWishlist(productId: number, event: Event) {
    event.stopPropagation();
    this.wishlistFacadeService.createNewWishlistItem(productId);
  }
  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }
}
