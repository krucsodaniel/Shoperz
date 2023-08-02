import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, DestroyRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FilterService, ProductsManipulationService } from '../../../services';
import { IFilterDefinition } from 'src/shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    private filterService: FilterService,
    private productsManipulationService: ProductsManipulationService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.filterService.getFilterDefinitions()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((filterDefinition: IFilterDefinition[]) => {
        this.filterDefinitions = filterDefinition;

        this.filterDefinitions.forEach((definition: IFilterDefinition) => {
          this.form.addControl(definition.id, new FormControl([]));
        });

        this.cdr.detectChanges();
      });

    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: Record<string, string[]>) => {
        this.productsManipulationService.setFilter(value);
      });
  }
}
