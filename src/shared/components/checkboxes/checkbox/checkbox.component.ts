import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
} from '@angular/core';
import { IFilterOption } from '../../../models';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxGroupComponent } from '../checkbox-group/checkbox-group.component';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  value: boolean;

  @Input()
  option: IFilterOption;

  @Input()
  multiselect: boolean;

  onChange = (value: boolean) => {};
  onTouch = () => {};

  constructor(
    private cdr: ChangeDetectorRef,
    @Host() public checkboxGroupComponent: CheckboxGroupComponent,
    ) {}

  writeValue(value: boolean): void {
    this.value = value;
    this.onChange(value);
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onToggleCheckbox(): void {
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouch();

    this.checkboxGroupComponent.checkboxChanged(this.option);
    this.cdr.markForCheck();
  }

  buildTranslationKeyForLabels(optionValue: string, optionId: string): string {
    if (optionId.includes('category')) {
      return `categories.${ optionValue.toLowerCase() }`;
    } else if(optionId === 'allPrice') {
      return `prices.${ optionValue.toLowerCase() }`;
    } else {
      return optionValue;
    }
  }
}
