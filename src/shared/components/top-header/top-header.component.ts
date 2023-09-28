import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Langs } from '../../enums/langs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopHeaderComponent {
  readonly dropdownOptions = [
    { value: Langs.english, label: 'English'},
    { value: Langs.hungarian, label: 'Magyar'},
    { value: Langs.german, label: 'Deutsch'},
  ];

  constructor(private translateService: TranslateService) {}

  onChange(event: any){
    this.translateService.use(event.target.value);
  }
}
