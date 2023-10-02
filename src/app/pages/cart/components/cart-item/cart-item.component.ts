import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { CartFacadeService, ICalculatedProduct } from '@shared-module';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent implements OnInit {
  @Input()
  product: ICalculatedProduct;

  numberFormControl: FormControl<number>;

  @HostBinding('class')
  private readonly classes = 'flex flex-col md:flex-row items-center md:justify-around gap-3 w-full md:w-10/12 active:outline-0 py-4 my-4 md:h-72 rounded-md border-2 border-grey-300 shadow-md hover:shadow-xl duration-300';

  constructor(
    private cartFacadeService: CartFacadeService,
    private translate: TranslateService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.numberFormControl = new FormControl(this.product['amount'], [Validators.required]);

    this.numberFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: number) => this.updateItemInCart(this.product.id, +value));
  }

  calculateTotal(price: number): number {
    return price * this.numberFormControl.value;
  }

  incrementQuantity(): void {
    const currentValue = +this.numberFormControl.value;

    if (currentValue < 10) {
      this.numberFormControl.setValue(currentValue + 1);
    }
  }

  decrementQuantity(): void {
    const currentValue = +this.numberFormControl.value;

    if (currentValue >= 2) {
      this.numberFormControl.setValue(currentValue - 1);
    }

    if (currentValue === 1) {
        this.removeItemFromCart(this.product.id);
    }
  }

  removeItemFromCart(productId: number): void {
    if (confirm(this.translate.instant('general.confirmMessage'))) {
      this.cartFacadeService.removeProductFromCart(productId);
    }
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${ relativeKey }`;
  }

  private updateItemInCart(productId: number, amount: number): void {
    this.cartFacadeService.updateProductAmount(productId, amount);
  }
}
