import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Language } from '../../enums/language';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHeaderComponent {
  readonly dropdownOptions = [
    { value: Language.english, label: 'English'},
    { value: Language.hungarian, label: 'Magyar'},
    { value: Language.german, label: 'Deutsch'},
  ];

  constructor(private translateService: TranslateService) {}

  onChange(event: Event): void {
    const language = (event.target as HTMLSelectElement).value;
    this.translateService.use(language);
  }
}
