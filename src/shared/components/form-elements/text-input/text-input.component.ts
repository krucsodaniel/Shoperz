/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Input,
  OnInit
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControlStatus, NgControl } from '@angular/forms';
import { bufferCount, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements ControlValueAccessor, OnInit {
  value: any;

  @Input()
  label: string;

  @Input()
  type: string;

  @Input()
  placeholder: string;

  onChange: (value: any) => void = (value: any) => {};
  onTouch: () => void = () => {};

  get control(): AbstractControl {
    return this.ngControl.control;
  }

  constructor(
    private ngControl: NgControl,
    private destroyRef: DestroyRef,
    private cdr: ChangeDetectorRef,
  )
  {
    ngControl.valueAccessor = this;
  }

  ngOnInit(): void {
    this.control.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prevState]: FormControlStatus[]) => prevState === 'PENDING'),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.cdr.markForCheck());
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = () => {
      fn();
      this.control.markAsTouched();
    }
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.value = inputElement.value;
    this.onChange(this.value);
    this.control.markAsDirty();
  }

  onBlur(): void {
    this.onTouch();
  }
}
