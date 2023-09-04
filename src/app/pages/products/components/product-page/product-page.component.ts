import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICalculatedProduct, ProductFacadeService } from '@shared-module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductPageComponent implements OnInit {
  product$: Observable<ICalculatedProduct>;
  selectedPicture: string;

  @HostBinding('class')
  private readonly classes = 'flex flex-col md:flex-row flex-wrap justify-center md:justify-around gap-5 mx-auto pt-10 pb-5 mt-4';

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
