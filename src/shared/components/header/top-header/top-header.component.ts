import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Langs } from '../../../enums/langs';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHeaderComponent {
  readonly options = [
    { value: Langs.english, label: 'English' },
    { value: Langs.hungarian, label: 'Magyar' },
    { value: Langs.german, label: 'Deutsch' },
  ]
}
