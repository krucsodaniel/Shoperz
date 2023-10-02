import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
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
import { firstValueFrom } from 'rxjs';
import { DateGeneratorService } from '../../services';

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

  get calculateTotal(): number {
    return this.subTotal + this.shippingFee;
  }

  constructor(
    private cartFacadeService: CartFacadeService,
    private cdr: ChangeDetectorRef,
    private ordersFacadeService: OrdersFacadeService,
    private router: Router,
    private dateGeneratorService: DateGeneratorService,
    private destroyRef: DestroyRef,
  ) {}

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

  async checkout(): Promise<void> {
    const newOrder: IOrder = {
      products: await firstValueFrom(this.cartFacadeService.getCart()),
      totalAmount: this.calculateTotal,
      status: OrderStatus.processing,
      orderDate: this.dateGeneratorService.generateOrderDate(),
    }

    this.ordersFacadeService.createOrder(newOrder);

    this.cartFacadeService.clearCart();

    this.router.navigate([Route.orders]);
  }
}
