import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { ICalculatedProduct, WishlistFacadeService } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  favourites: ICalculatedProduct[];
  readonly headerTranslationKeys = ['picture', 'product', 'price', 'operations'];

  constructor(private wishlistFacadeService: WishlistFacadeService, private destroyRef: DestroyRef) {}

  ngOnInit() {
    this.wishlistFacadeService.getWishlist()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((productsOnWishlist: ICalculatedProduct[]) => {
        this.favourites = productsOnWishlist;
      })
  }

  buildTranslationKey(relativeKey: string): string {
    return `wishlistPage.${ relativeKey }`;
  }
}
