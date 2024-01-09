import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { IUser } from '../../models';

@Component({
  selector: 'app-nav-icon',
  templateUrl: './nav-icon.component.html',
  styleUrls: ['./nav-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavIconComponent {
  @Input()
  url: string;
  @Input()
  amount: number;
  @Input()
  user: IUser;

  readonly routerLink: string;

  @HostBinding('class')
  private readonly classes = 'relative block h-9 w-9';
}
