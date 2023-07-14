import { Component, OnInit, NgIterable, inject, DestroyRef } from '@angular/core';
import { ProductFacadeService } from '../../services';
import { IProduct } from 'src/shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  productCards: IProduct[];
  destroyRef = inject(DestroyRef);

  constructor(private productFacadeService: ProductFacadeService) {}

  ngOnInit() {
    this.productFacadeService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: IProduct[]) => {
        this.productCards = products;
      });
  }
}
