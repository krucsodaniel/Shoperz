import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterFacadeService } from '../../../services';
import { IFilterDefinition, ProductsManipulationService } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, firstValueFrom, take } from 'rxjs';

type FilterFormType = Record<string, FormControl<string[]>>;

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPanelComponent implements OnInit {
  readonly form = new FormGroup<FilterFormType>({});
  filterDefinitions: IFilterDefinition[];

  get controls(): FormControl[] {
    return Object.values(this.form.controls) as FormControl[];
  }

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private filterFacadeService: FilterFacadeService,
    private productsManipulationService: ProductsManipulationService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit(): Promise<void> {
    await firstValueFrom(this.filterFacadeService.getFilterDefinitions());

    this.filterFacadeService.getFilterDefinitions()
      .pipe(
        take(1),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((filterDefinition: IFilterDefinition[]) => {
        this.filterDefinitions = filterDefinition;

        this.filterDefinitions.forEach((definition: IFilterDefinition) => {
          this.form.addControl(definition.id, new FormControl([]));
        });

        this.cdr.detectChanges();
      });

    this.filterFacadeService.getFilterValue()
      .pipe(
        filter((value: Record<string, string[]>) => JSON.stringify(value) !== JSON.stringify(this.form.value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value: Record<string, string[]>) => {
        this.form.setValue({
          ...this.form.value,
          ...value,
        });
      });

    this.form.valueChanges
      .pipe(
        distinctUntilChanged((prev: Record<string, string[]>, curr: Record<string, string[]>) => {
          return JSON.stringify(prev) === JSON.stringify(curr);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((filters: Record<string, string[]>) => {
        const filterParams = {
          ...filters,
        };

        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: filterParams,
          queryParamsHandling: 'merge',
        });
      });
  }
}
