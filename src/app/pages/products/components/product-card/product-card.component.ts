import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Input } from '@angular/core';
import { ICalculatedProduct } from 'src/shared/models';
import { Router } from '@angular/router';
import { Route } from 'src/shared/enums'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
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
