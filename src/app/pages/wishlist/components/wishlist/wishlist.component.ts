import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, HostBinding, OnInit } from '@angular/core';
import { ICalculatedProduct, ProductFacadeService, WishlistFacadeService } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistComponent implements OnInit {
  productsOnWishlist: ICalculatedProduct[];
  readonly headerTranslationKeys = ['picture', 'product', 'price', 'operations'];
  isLoading$: Observable<boolean>;

  @HostBinding('class')
  private readonly classes = 'block py-16';

  constructor(
    private wishlistFacadeService: WishlistFacadeService,
    private productFacade: ProductFacadeService,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.productFacade.getProducts()
      .pipe(map((products) => !products));

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
