import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  readonly errorStyle= 'text-red-600 border-2 border-red-700'
  private readonly emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  get emailControl(): AbstractControl { // TODO: Make it generic with parameter
    return this.feedbackForm.get('email');
  }

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

  onSubmit() {
    const feedbackFormValues = this.feedbackForm.value;
    console.log(feedbackFormValues);
  }

  getControl(controlName: string): AbstractControl {
    return this.feedbackForm.get(controlName);
  }

  isFormControlNameValid(controlName: string) {
    return this.getControl('controlName').hasError('pattern') && this.getControl('controlName').touched
  }
}
