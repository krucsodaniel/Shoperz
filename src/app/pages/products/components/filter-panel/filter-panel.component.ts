import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  DestroyRef,
  HostBinding,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  FilterFacadeService,
  IFilterDefinition,
  IFilterOption,
  ProductsManipulationService,
} from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, firstValueFrom, map } from 'rxjs';

type FilterFormType = Record<string, FormGroup>;
type FilterOptions = Record<string, boolean>;

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent implements OnInit {
  readonly filterForm = this.fb.group<FilterFormType>({});
  filterDefinitions: IFilterDefinition[];

  @HostBinding('class')
  private readonly classes = 'md:min-w-66';

  constructor(
    private filterFacadeService: FilterFacadeService,
    private productsManipulationService: ProductsManipulationService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef,
    private fb: FormBuilder,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.buildFilterForm();
    this.listenRouteChanges();
    this.listenFilterChanges();
  }

  buildTranslationKeyForLabels(definitionId: string): string {
    return `filter.${ definitionId.toLowerCase() }`;
  }

  buildTranslationKeyForCheckboxes(optionValue: string, optionId: string): string {
    if (optionId.includes('category')) {
      return `categories.${ optionValue.toLowerCase() }`;
    }

    if (optionId === 'allPrice') {
      return `prices.${ optionValue.toLowerCase() }`;
    }

    return optionValue;
  }

  private async buildFilterForm(): Promise<void> {
    this.filterDefinitions = await firstValueFrom(this.filterFacadeService.getFilterDefinitions());

    this.filterDefinitions.forEach((definition: IFilterDefinition) => {
      const group = this.fb.group({});

      definition.options.forEach((option: IFilterOption) => {
        group.addControl(option.id, this.fb.control(false));
      });

      this.filterForm.addControl(definition.id, group);
    });

    this.cdr.detectChanges();
  }

  private listenRouteChanges(): void {
    this.filterFacadeService.getFilterValue()
      .pipe(
        filter((value: Record<string, string[]>) => JSON.stringify(value) !== JSON.stringify(this.filterForm.value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((filters: Record<string, string[]>) => this.setFilterFormValues(filters));
  }

  private setFilterFormValues(filters: Record<string, string[]>): void {
    Object.entries(filters).forEach(([category, selectedOptions]: [string, string[]]) => {
      const formGroup = this.filterForm.get(category);

      if (formGroup) {
        const formControls = formGroup['controls'];

        Object.keys(formControls).forEach((option) => {
          const control = formControls[option];

          control.setValue(selectedOptions.includes(option));
        });
      }
    });
  }

  private listenFilterChanges(): void {
    this.filterForm.valueChanges
      .pipe(
        map((filterOptions) => {
          const filters: Record<string, string | string[]> = {};

          Object.entries(filterOptions).forEach(([category, values]: [string, FilterOptions]) => {
            const selectedOptions = Object.entries(values)
              .filter(([key, value]: [string, boolean]) => value === true)
              .map(([key]: [string, boolean]) => key);

            filters[category] = selectedOptions;
          });

          return filters;
        }),
        distinctUntilChanged((prev: Record<string, string[]>, curr: Record<string, string[]>) => {
          return JSON.stringify(prev) === JSON.stringify(curr);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((filters: Record<string, string[]>) => this.navigate(filters));
  }

  private navigate(filters: Record<string, string[]>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filters,
      queryParamsHandling: 'merge',
    });
  }
}
