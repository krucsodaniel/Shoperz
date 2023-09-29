import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackFormComponent {
  buildTranslationKey(relativeKey: string): string {
    return `aboutUsPage.feedbackForm.${ relativeKey }`;
  }
}
