import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { SortingOption, ProductsManipulationService } from '@shared-module';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SortFacadeService } from '../../services';
import { distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-product-sorting',
  templateUrl: './products-sorting.component.html',
  styleUrls: ['./products-sorting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsSortingComponent implements OnInit {
  readonly sortFormControl = new FormControl<SortingOption>(SortingOption.default);

  readonly options: { value: SortingOption, label: string }[] = [
    { value: SortingOption.default, label: this.buildTranslationKey('default') },
    { value: SortingOption.nameAscending, label: this.buildTranslationKey('name-ascending') },
    { value: SortingOption.nameDescending, label: this.buildTranslationKey('name-descending') },
    { value: SortingOption.priceAscending, label: this.buildTranslationKey('price-ascending') },
    { value: SortingOption.priceDescending, label: this.buildTranslationKey('price-descending') },
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private productsManipulationService: ProductsManipulationService,
    private sortFacadeService: SortFacadeService
  ) {}

  ngOnInit(): void {
    this.sortFacadeService.getSortOption()
      .pipe(
        filter((value: string) => value !== this.sortFormControl.value),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: SortingOption) => {
        this.sortFormControl.setValue(value);
      });

    this.sortFormControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: SortingOption): void => this.sortFacadeService.setSortingOption(value));
  }

  buildTranslationKey(relativeKey: string): string {
    return `features.sorting.${ relativeKey }`;
  }
}
