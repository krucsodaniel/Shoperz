import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent {
  buildTranslationKey(link: string, relativeKey: string): string {
    return `aboutUsPage.${ link }.${ relativeKey }`;
  }
}
