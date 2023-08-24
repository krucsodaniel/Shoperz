import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../enums';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly Route = Route;
}
