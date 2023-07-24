import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ProductFacadeService, CardStateService, ProductsManipulationService } from '../../services';
import { IProduct } from 'src/shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  isExpanded = false;
  products: IProduct[];
  isLoading = true;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private productFacadeService: ProductFacadeService,
    private cardStateService: CardStateService,
    private productsManipulationService: ProductsManipulationService,
  ) {}

  ngOnInit(): void {
    this.productFacadeService.initProducts();

    this.productsManipulationService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: IProduct[]) => {
        this.products = products;
        this.isLoading = false;
      });

    this.cardStateService.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded: boolean) => this.isExpanded = isExpanded);
  };
}
