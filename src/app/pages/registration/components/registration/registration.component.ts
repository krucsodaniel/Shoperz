import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  @HostBinding('class')
  private readonly classes = 'flex justify-center m-auto py-16 gap-8';
}
