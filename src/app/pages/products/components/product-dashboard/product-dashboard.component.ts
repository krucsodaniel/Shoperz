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
  products: IProduct[];
  displayedData: IProduct[];
  isLoading = true;

  private sortOption: SortingOption;
  private readonly loadProducts$ = new Subject<void>();
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private productFacadeService: ProductFacadeService,
    private cardStateService: CardStateService,
    private productSortingService: ProductSortingService,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.loadProducts$
      .pipe(
        startWith(null),
        switchMap(() => this.productFacadeService.getProducts()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((products: IProduct[]) => {
        this.products = products;
        this.displayedData = products;
        this.isLoading = false;
      });

    this.cardStateService.getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded: boolean) => this.isExpanded = isExpanded);

    this.productSortingService.getSortingMethod()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((sortingOption: SortingOption) => {
        this.sortProducts(sortingOption);
        this.sortOption = sortingOption;
      });

    this.searchService.getSearchValue()
      .pipe(
        debounceTime(600),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((searchValue: string) => this.searchProducts(searchValue));
  };

  sortProducts(sortingOption: SortingOption): void {
    this.displayedData = this.productSortingService.sortProducts(this.displayedData, sortingOption);
  }

  searchProducts(searchValue: string): void {
    if (searchValue) {
      const searchResult = this.searchService.searchProductsByName(this.products, searchValue);
      const sortResult = this.productSortingService.sortProducts(searchResult, this.sortOption);

      this.displayedData = sortResult;
    } else {
      this.displayedData = this.productSortingService.sortProducts(this.products, this.sortOption);
    }
  }
}
