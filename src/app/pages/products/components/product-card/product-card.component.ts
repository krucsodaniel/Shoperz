import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { ICalculatedProduct, Route } from '@shared-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  readonly typeOfPage = 'product-card';

  @Input()
  card: ICalculatedProduct;

  @HostBinding('class.expanded-card')
  @Input()
  isExpanded: boolean;

  constructor(private router: Router) {}

  @HostListener('click')
  navigateToProductPage(): void {
    this.router.navigate([Route.products, this.card.id]);
  }
}
