import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from 'src/shared/enums'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly Route = Route;

  buildTranslationKey(relativeKey: string): string {
    return `sharedComponents.header.${ relativeKey }`;
  }
}
