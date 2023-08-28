import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  DestroyRef,
  inject
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFilterOption } from '@shared-module';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCardComponent implements OnInit {
  @Input()
  headerText: string;

  @Input()
  control: FormControl;

  @Input()
  options: IFilterOption[];

  @Input()
  multiselect: boolean;

  selectedOptions: string[] = [];

  private readonly destroyRef = inject(DestroyRef);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.control.value) {
      this.selectedOptions = [...this.control.value];
      this.cdr.detectChanges();
    }

    this.control.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value: string[]) => {
        this.selectedOptions = value;
        this.cdr.detectChanges();
      });
  }

  isChecked(optionId: string): boolean {
    return this.selectedOptions.includes(optionId);
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const optionId = input.value;

    if (input.checked) {
      if (this.multiselect) {
        this.selectedOptions = [...this.selectedOptions, optionId];
      } else {
        this.selectedOptions = [optionId];
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter((id: string) => id !== optionId);
    }

    this.control.setValue(this.selectedOptions);
  }
}
