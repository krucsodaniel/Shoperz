import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/shared/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent{
  @Input()
  card: IProduct;

  isExpanded: boolean = false;
}
