import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { ICalculatedProduct, WishlistFacadeService } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  productsOnWishlist: ICalculatedProduct[];
  readonly headerTranslationKeys = ['picture', 'product', 'price', 'operations'];

  constructor(private wishlistFacadeService: WishlistFacadeService,
              private destroyRef: DestroyRef,
              private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.wishlistFacadeService.getWishlist()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((productsOnWishlist: ICalculatedProduct[]) => {
        this.productsOnWishlist = productsOnWishlist;
        this.cdr.detectChanges();
      })
  }

  trackById(_, favourite: ICalculatedProduct): string {
    return favourite.id;
  }

  buildTranslationKey(relativeKey: string): string {
    return `wishlistPage.${ relativeKey }`;
  }
}
