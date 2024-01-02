/* eslint-disable @typescript-eslint/no-empty-function */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInputComponent,
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  value: any;

  @Input()
  label: string;

  @Input()
  type: string;

  @Input()
  controlName: string;

  @Input()
  placeholder: string;

  @Input()
  isValid: boolean;

  @Input()
  isDirty: boolean;

  @Input()
  isPending: boolean;

  onChange: (value: any) => void = (value: any) => {};
  onTouch: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.value = inputElement.value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouch();
  }
}
