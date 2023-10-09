import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { FeedbackFacadeService, EMAIL_REGEX, Control } from '@shared-module';

const DELAY_TIME = 3000;

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  currentRate: number;
  isThankYouMessageVisible = false;

  get emailControl(): AbstractControl {
    return this.feedbackForm.controls[Control.email];
  }

  get feedbackControl(): AbstractControl {
    return this.feedbackForm.controls[Control.feedbackMessage];
  }

  get nameControl(): AbstractControl {
    return this.feedbackForm.controls[Control.name];
  }

  constructor(private feedbackFacadeService: FeedbackFacadeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.feedbackForm = new FormGroup({
      [Control.feedbackMessage]: new FormControl(null, Validators.required),
      [Control.name]: new FormControl(null, Validators.required),
      [Control.email]: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_REGEX)]),
    });
  }

  buildTranslationKey(relativeKey: string): string {
    return `aboutUsPage.feedbackForm.${ relativeKey }`;
  }

  onSubmit(): void {
    const newFeedback = { ...this.feedbackForm.value, rate: this.currentRate };
    this.feedbackFacadeService.createNewFeedback(newFeedback);
    this.feedbackForm.reset();
    this.isThankYouMessageVisible = true;

    setTimeout(() => {
      this.isThankYouMessageVisible = false;
      this.cdr.markForCheck();
    }, DELAY_TIME);
  }

  newCurrentRate(currentRate: number): void {
    this.currentRate = currentRate;
  }
}
