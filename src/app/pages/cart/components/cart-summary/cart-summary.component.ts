import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  inject,
  DestroyRef
} from '@angular/core';
import { CartFacadeService } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummaryComponent implements OnInit {
  subTotal: number;
  readonly shippingFee = 50;

  @HostBinding('class')
  private readonly classes = 'flex flex-col justify-center items-start order-0 md:order-1 fixed bottom-0 right-0 mx-auto w-full md:w-96 rounded-md border-2 border-solid border-grey-600 h-72 gap-5 p-6 bg-grey-200';
  private readonly destroyRef = inject(DestroyRef);

  get calculateTotal(): number {
    return this.subTotal + this.shippingFee;
  }

  constructor(private cartFacadeService: CartFacadeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cartFacadeService.getTotalAmountOfPriceInCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((totalPrice: number) => {
        this.subTotal = totalPrice;
        this.cdr.detectChanges();
      });
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${relativeKey}`;
  }
}
