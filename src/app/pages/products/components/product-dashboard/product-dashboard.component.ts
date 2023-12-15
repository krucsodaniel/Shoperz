import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { CardStateService } from '../../services';
import { ICalculatedProduct, ProductFacadeService, ProductsManipulationService } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDashboardComponent implements OnInit {
  isExpanded = false;
  products: ICalculatedProduct[];
  isLoading = true;
  emptyProductList = false;

  constructor(
    private productFacadeService: ProductFacadeService,
    private cardStateService: CardStateService,
    private productsManipulationService: ProductsManipulationService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.productFacadeService.initProductsPage();

    this.productsManipulationService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((products: ICalculatedProduct[]) => {
        this.products = products;
        this.isLoading = false;
        this.cdr.detectChanges();
      });

    this.cardStateService.getView()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded: boolean) => this.isExpanded = isExpanded);
  }
}
