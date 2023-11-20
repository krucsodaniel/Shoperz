import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CartFacadeService } from '../../services';
import { firstValueFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page-add-to-cart-icon',
  templateUrl: './product-page-add-to-cart-icon.component.html',
  styleUrls: ['./product-page-add-to-cart-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageAddToCartIconComponent implements OnInit {
  isProductInCart: boolean;

  @Input()
  productId: string;

  @Input()
  amountOfProductInCart: number;

  @Output()
  readonly amountChange = new EventEmitter<number>();

  constructor(
    private cartFacadeService: CartFacadeService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isProductInCart = await firstValueFrom(this.cartFacadeService.checkIfProductIsInCart(this.productId));

    if (this.isProductInCart) {
      this.cartFacadeService.getCurrentCartItemAmount(this.productId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((amountInCart: number) => this.amountChange.emit(amountInCart));
    }

    this.cdr.detectChanges();
  }

  async toggleProductInCart(event: Event): Promise<void> {
    event.stopPropagation();

    if (this.isProductInCart) {
      this.cartFacadeService.updateProductAmount(this.productId, this.amountOfProductInCart);
    } else {
      this.cartFacadeService.addProductToCart(this.productId, 1);
    }

    this.cdr.detectChanges();
  }

  get buttonText(): string {
    if (this.isProductInCart) {
      return this.buildTranslationKey('updateAmount');
    } else {
      return this.buildTranslationKey('addToCart');
    }
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }
}
