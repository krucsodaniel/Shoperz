import { Component, DestroyRef, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SortingOption } from 'src/shared/enums/';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductsManipulationService } from '../../services'

@Component({
  selector: 'app-products-sorting',
  templateUrl: './products-sorting.component.html',
  styleUrls: ['./products-sorting.component.scss']
})
export class ProductsSortingComponent implements OnInit, OnChanges {
  readonly sortFormControl = new FormControl<SortingOption>(SortingOption.default);

  @Input()
  isLoading: boolean;

  readonly options: { value: SortingOption, label: string }[] = [
    { value: SortingOption.default, label: this.buildTranslationKey('default') },
    { value: SortingOption.nameAscending, label: this.buildTranslationKey('name-ascending') },
    { value: SortingOption.nameDescending, label: this.buildTranslationKey('name-descending') },
    { value: SortingOption.priceAscending, label: this.buildTranslationKey('price-ascending') },
    { value: SortingOption.priceDescending, label: this.buildTranslationKey('price-descending') },
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor(private productsManipulationService: ProductsManipulationService) {}

  ngOnInit(): void {
    this.sortFormControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: SortingOption): void => this.productsManipulationService.setSortingOption(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('isLoading' in changes) {
      this.toggleFormControl();
    }
  }

  toggleFormControl(): void {
    if (this.isLoading) {
      this.sortFormControl.disable();
    } else {
      this.sortFormControl.enable();
    }
  }

  buildTranslationKey(relativeKey: string): string {
    return `features.sorting.${ relativeKey }`;
  }
}
