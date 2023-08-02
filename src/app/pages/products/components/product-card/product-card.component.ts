import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ICalculatedProduct } from 'src/shared/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent{
  @Input()
  card: ICalculatedProduct;

  @Input()
  isExpanded: boolean;
}
