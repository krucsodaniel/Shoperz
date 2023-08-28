import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICalculatedProduct, ProductFacadeService } from '@shared-module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  product$: Observable<ICalculatedProduct>;
  selectedPicture: string;

  private productId: number;

  constructor(
    private productFacadeService: ProductFacadeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;
    this.productId = +paramMap.get('id');
    this.product$ = this.productFacadeService.getProductById(this.productId);
  };

  choosePicture(productPicture: string): void {
    this.selectedPicture = productPicture;
  }
}
