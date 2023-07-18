import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  buildTranslationKey(relativeKey: string): string {
    return `sharedComponents.header.${ relativeKey }`;
  }
}
