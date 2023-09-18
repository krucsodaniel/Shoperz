import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  inject,
  DestroyRef
} from '@angular/core';
import { Route } from '../../enums';
import { CartFacadeService } from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartIconComponent implements OnInit {
  amountInCart: number;

  @HostBinding('class')
  private readonly classes = 'relative';
  protected readonly Route = Route;
  private readonly destroyRef = inject(DestroyRef);

  constructor(private cartFacadeService: CartFacadeService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.cartFacadeService.getTotalAmountOfProductsInCart()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((totalNumberOfCartItems: number) => {
        this.amountInCart = totalNumberOfCartItems;
        this.cdr.detectChanges();
      });
    this.cdr.detectChanges();
  }
}
