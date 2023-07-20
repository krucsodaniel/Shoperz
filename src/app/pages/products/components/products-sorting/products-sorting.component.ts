import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ProductSortingService } from '../../services';
import { SortingOption } from 'src/shared/enums/';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-sorting',
  templateUrl: './products-sorting.component.html',
  styleUrls: ['./products-sorting.component.scss']
})
export class ProductsSortingComponent implements OnInit {
  sortFormControl: FormControl;

  readonly options: { value: SortingOption, label: string }[] = [
    { value: SortingOption.default, label: this.buildTranslationKey('default') },
    { value: SortingOption.nameAscending, label: this.buildTranslationKey('name-ascending') },
    { value: SortingOption.nameDescending, label: this.buildTranslationKey('name-descending') },
    { value: SortingOption.priceAscending, label: this.buildTranslationKey('price-ascending') },
    { value: SortingOption.priceDescending, label: this.buildTranslationKey('price-descending') },
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor(private productSortingService: ProductSortingService) {}

  ngOnInit(): void {
    this.sortFormControl = new FormControl<SortingOption>(SortingOption.default);

    this.sortFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: SortingOption): void => this.productSortingService.setSortingMethod(value));
  }

  buildTranslationKey(relativeKey: string): string {
    return `features.sorting.${ relativeKey }`;
  }
}
