import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHeaderComponent {

}
