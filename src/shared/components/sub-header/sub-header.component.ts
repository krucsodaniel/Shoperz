import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../enums';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubHeaderComponent {
  protected readonly Route = Route;

  buildTranslationKey(relativeKey: string): string {
    return `sharedComponents.header.${ relativeKey }`;
  }
}
