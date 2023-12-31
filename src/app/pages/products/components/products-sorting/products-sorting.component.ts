import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { SortingOption, SortFacadeService } from '@shared-module';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-sorting',
  templateUrl: './products-sorting.component.html',
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

  constructor(
    private sortFacadeService: SortFacadeService,
    private router: Router,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef,
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
      .subscribe((sortingOption: SortingOption): void => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { sortingOption: sortingOption === SortingOption.default ? undefined : sortingOption },
          queryParamsHandling: 'merge',
        });
      });
  }

  buildTranslationKey(relativeKey: string): string {
    return `features.sorting.${ relativeKey }`;
  }
}
