import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { ProductFacadeService, CardStateService, ProductSortingService } from '../../services';
import { IProduct } from 'src/shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SortingOption } from 'src/shared/enums';
import { SearchService } from 'src/shared/services';
import { debounceTime, startWith, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  isExpanded = false;
  productCards: IProduct[];

  private readonly product$ = new Subject<void>();

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private productFacadeService: ProductFacadeService,
    private cardStateService: CardStateService,
    private productSortingService: ProductSortingService,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.product$
      .pipe(
        startWith(null),
        switchMap(() => this.productFacadeService.getProducts()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((products: IProduct[]) => this.productCards = products);

    this.cardStateService.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded: boolean) => this.isExpanded = isExpanded);

    this.productSortingService.getSortingMethod()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((sortingOption: SortingOption) => this.sortProducts(sortingOption));

    this.searchService.getSearchValue()
      .pipe(
        debounceTime(600),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchValue: string) => this.searchProducts(searchValue));

    this.searchService.getDeleteValue()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.product$.next());
  };

  sortProducts(sortingOption: SortingOption): void {
    this.productCards = this.productSortingService.sortProducts(this.productCards, sortingOption);
  }

  searchProducts(searchValue: string): void {
    if (!searchValue) {
      this.product$.next();
    }

    this.productCards = this.searchService.searchProductsByName(this.productCards, searchValue);
  }
}
