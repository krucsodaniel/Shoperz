import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Route } from '../../enums';
import { CartFacadeService, ProductFacadeService } from '../../services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-middle-header',
  templateUrl: 'middle-header.component.html',
  styleUrls: ['./middle-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiddleHeaderComponent implements OnInit {
  amountInCart$: Observable<number>;
  amountOnWishlist$: Observable<number>;
  protected readonly Route = Route;

  constructor(private cartFacadeService: CartFacadeService, private productFacadeService: ProductFacadeService) {}

  ngOnInit(): void {
    this.amountInCart$ = this.cartFacadeService.getTotalAmountOfProductsInCart();
    this.amountOnWishlist$ = this.productFacadeService.getTotalAmountOnWishlist();
  }
}
