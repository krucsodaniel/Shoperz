import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartFacadeService } from '../../services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-add-to-cart-icon',
  templateUrl: './add-to-cart-icon.component.html',
  styleUrls: ['./add-to-cart-icon.component.scss'],
})
export class AddToCartIconComponent implements OnInit {
  isProductInCart: boolean;

  @Input()
  typeOfPage: 'product-card' | 'product-page';
  @Input()
  productId: string;
  @Input()
  isExpanded?: boolean;
  @Input()
  amountOfProductInCart: number;

  @Output()
  readonly amountChange = new EventEmitter<number>();

  constructor(private cartFacadeService: CartFacadeService, private cdr: ChangeDetectorRef) {}

  async ngOnInit(): Promise<void> {
    this.isProductInCart = await firstValueFrom(this.cartFacadeService.checkIfProductIsInCart(this.productId));

    if (this.typeOfPage === 'product-page' && this.isProductInCart) {
      const currentAmount = await firstValueFrom(this.cartFacadeService.getCurrentCartItemAmount(this.productId));
      this.amountChange.emit(currentAmount);
    }

    this.cdr.detectChanges();
  }

  async toggleProductInCart(event: Event): Promise<void> {
    event.stopPropagation();

    if (this.isProductInCart) {
      if (this.typeOfPage === 'product-card') {
        this.cartFacadeService.removeProductFromCart(this.productId);
      } else if (this.typeOfPage === 'product-page') {
        this.cartFacadeService.updateProductAmount(this.productId, this.amountOfProductInCart);
        return;
      }

      this.isProductInCart = false;
    } else {
      if (this.typeOfPage === 'product-card') {
        this.cartFacadeService.addProductToCart(this.productId, 1);
        this.isProductInCart = true;
      } else if (this.typeOfPage === 'product-page') {
        this.cartFacadeService.addProductToCart(this.productId, this.amountOfProductInCart);
        this.isProductInCart = true;
      }
    }

    this.cdr.detectChanges();
  }

  getButtonClasses(): string {
    if (this.typeOfPage === 'product-card') {
      return this.isExpanded ? 'expanded' : 'collapsed';
    }

    if (this.typeOfPage === 'product-page') {
      return this.isProductInCart ? 'product-page-button update-amount' : 'product-page-button';
    }

    return '';
  }

  getButtonText(): string {
    if ((!this.isProductInCart && this.isExpanded) || (!this.isProductInCart && this.typeOfPage === 'product-page')) {
      return this.buildTranslationKey('addToCart');
    }

    if (this.isProductInCart && this.isExpanded) {
      return this.buildTranslationKey('productIsInCart');
    } else {
      return this.buildTranslationKey('updateAmount');
    }
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }
}
