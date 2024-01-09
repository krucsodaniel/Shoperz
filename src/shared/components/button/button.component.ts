import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @HostBinding('class.disabled')
  @Input()
  disabled: boolean;

  @Input()
  text: string;

  @HostBinding('class')
  private readonly classes = 'w-full h-12 flex justify-center items-center bg-blue-600 text-white text-size-18 font-bold border-2 border-blue-600 rounded transition duration-300 cursor-pointer';

  @HostBinding('attr.role')
  private readonly role = 'button';
}
