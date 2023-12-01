import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-nav-icon',
  templateUrl: './nav-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavIconComponent {
  @Input()
  url: string;
  @Input()
  amount: number;

  readonly routerLink: string;

  @HostBinding('class')
  private readonly classes = 'relative block h-9 w-9';

}
