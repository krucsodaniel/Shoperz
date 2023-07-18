import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ProductFacadeService, CardStateService } from '../../services';
import { IProduct } from 'src/shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  isExpanded = false;
  productCards: IProduct[];

  private readonly destroyRef = inject(DestroyRef);

  constructor(private productFacadeService: ProductFacadeService, private cardStateService: CardStateService) {}

  ngOnInit(): void {
    this.productFacadeService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: IProduct[]) => {
        this.productCards = products;
      });

    this.cardStateService.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded: boolean) => this.isExpanded = isExpanded);
  }
}
