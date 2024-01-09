import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  DestroyRef,
} from '@angular/core';
import { CartFacadeService, ICalculatedProduct, StoreInitializationService } from '@shared-module';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  products: ICalculatedProduct[];
  numberFormControl: FormControl<number>;
  readonly headerTranslationKeys = ['product', 'price', 'quantity', 'total'];

  @HostBinding('class')
  private readonly classes = 'mx-auto flex items-start flex-wrap py-16 gap-8';

  constructor(
    private cartFacadeService: CartFacadeService,
    private storeInitializationService: StoreInitializationService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.numberFormControl = new FormControl(1, [Validators.required]);

    this.cartFacadeService.getCartProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: ICalculatedProduct[]) => {
        this.products = products;
        this.cdr.detectChanges();
      });
  }

  buildTranslationKey(relativeKey: string): string {
    return `cart.${relativeKey}`;
  }
}
