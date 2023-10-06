import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FeedbackFacadeService } from '@shared-module';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  currentRate: number;
  thankYouMessageVisible = false;
  readonly errorStyle = 'text-red-600 border border-red-700';
  private readonly emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  constructor(private feedbackFacadeService: FeedbackFacadeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      feedbackMessage: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
    });
  }

  buildTranslationKey(relativeKey: string): string {
    return `aboutUsPage.feedbackForm.${ relativeKey }`;
  }

  onSubmit(): void {
    const newFeedback = {...this.feedbackForm.value, rate: this.currentRate};
    this.feedbackFacadeService.createNewFeedback(newFeedback);
    this.feedbackForm.reset();
    this.thankYouMessageVisible = true;

    setTimeout(() => {
      this.thankYouMessageVisible = false;
      this.cdr.markForCheck();
    }, 3000);
  }

  newCurrentRate(currentRate: number): void {
    this.currentRate = currentRate;
  }

  getControl(controlName: string): AbstractControl {
    return this.feedbackForm.get(controlName);
  }

  isTouched(controlName: string): boolean {
    return this.getControl(controlName).touched;
  }

  isInputValid(controlName: string, hasPattern = false): boolean {
    if (controlName === 'email' && hasPattern) {
      return this.getControl(controlName).hasError('pattern') && this.isTouched(controlName);
    }
    if (controlName === 'email') {
      return !this.getControl(controlName).value && this.isTouched(controlName);
    }
    return this.getControl(controlName).invalid && this.isTouched(controlName);
  }
}
