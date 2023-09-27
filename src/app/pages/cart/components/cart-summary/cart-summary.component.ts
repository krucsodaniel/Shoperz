import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  inject,
  DestroyRef,
} from '@angular/core';
import {
  CartFacadeService,
  ICartItem,
  IOrder,
  OrdersFacadeService,
  OrderStatus,
  Route,
} from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummaryComponent implements OnInit {
  subTotal: number;
  cart: ICartItem[];
  readonly shippingFee = 50;

  @HostBinding('class')
  private readonly classes = 'flex flex-col justify-center items-start order-0 md:order-1 fixed bottom-0 right-0 mx-auto w-full md:w-96 rounded-md border-2 border-solid border-grey-600 h-72 gap-5 p-6 bg-grey-200';
  private readonly destroyRef = inject(DestroyRef);

  get calculateTotal(): number {
    return this.subTotal + this.shippingFee;
  }

  constructor(
    private cartFacadeService: CartFacadeService,
    private cdr: ChangeDetectorRef,
    private ordersFacadeService: OrdersFacadeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cartFacadeService.getTotalAmountOfPriceInCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((totalPrice: number) => {
        this.subTotal = totalPrice;
        this.cdr.detectChanges();
      });

    this.cartFacadeService.getCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cart: ICartItem[]) => this.cart = cart);
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${relativeKey}`;
  }

  checkout(): void {
    const newOrder: IOrder = {
      products: this.cart,
      totalAmount: this.calculateTotal,
      status: OrderStatus.processing,
      orderDate: this.generateOrderDate(),
    }

    this.ordersFacadeService.createOrder(newOrder);
    this.router.navigate([Route.orders]);
  }

  private generateOrderDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const formattedDateTime = `${ year }.${ month }.${ day } ${ hours }:${ minutes }:${ seconds }`;

    return formattedDateTime.toString();
  }
}
