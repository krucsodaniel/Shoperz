import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input()
  message: string;

  @Input()
  type: 'error' | 'info' | 'warning' | 'success';
}
