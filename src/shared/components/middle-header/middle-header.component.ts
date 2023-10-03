import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../enums';

@Component({
  selector: 'app-middle-header',
  templateUrl: 'middle-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiddleHeaderComponent {
  protected readonly Route = Route;
}
