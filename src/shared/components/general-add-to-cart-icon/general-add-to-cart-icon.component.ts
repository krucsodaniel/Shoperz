import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CartFacadeService } from '../../services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-general-add-to-cart-icon',
  templateUrl: './general-add-to-cart-icon.component.html',
  styleUrls: ['./general-add-to-cart-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralAddToCartIconComponent implements OnInit {
  isProductInCart: boolean;

  @Input()
  productId: string;
  @Input()
  isExpanded?: boolean;
  @Input()
  amountOfProductInCart: number;

  get buttonText(): string {
    if (!this.isProductInCart && this.isExpanded) {
      return this.buildTranslationKey('addToCart');
    }

    return this.buildTranslationKey('productIsInCart');
  }

  constructor(
    private cartFacadeService: CartFacadeService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    this.isProductInCart = await firstValueFrom(this.cartFacadeService.checkIfProductIsInCart(this.productId));

    this.cdr.detectChanges();
  }

  async toggleProductInCart(event: Event): Promise<void> {
    event.stopPropagation();

    if (this.isProductInCart) {
      this.cartFacadeService.removeProductFromCart(this.productId);
    } else {
      this.cartFacadeService.addProductToCart(this.productId, 1);
    }

    this.isProductInCart = !this.isProductInCart;

    this.cdr.detectChanges();
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }
}
