import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  @Input()
  amount: number;

  @HostBinding('class')
  private readonly classes = 'flex justify-center items-center rounded-full w-6 h-6 bg-red-600 text-white font-bold';
}
