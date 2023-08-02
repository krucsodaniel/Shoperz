import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import {
  CardStateService,
  ProductFacadeService,
  ProductsManipulationService
} from '../../services';
import { ICalculatedProduct, IProduct } from 'src/shared/models';
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
  noProducts = false;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private productFacadeService: ProductFacadeService,
    private cardStateService: CardStateService,
    private productsManipulationService: ProductsManipulationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.productFacadeService.initData();

    this.productsManipulationService.getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: ICalculatedProduct[]) => {
        this.products = data;
        this.isLoading = false;
        this.noProducts = data.length === 0;
        this.cdr.markForCheck();
      });

    this.cardStateService.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded: boolean) => this.isExpanded = isExpanded);
  };
}
