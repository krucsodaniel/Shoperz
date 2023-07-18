import { Component } from '@angular/core';
import { CardStateService } from '../../services';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
})
export class ViewSwitchComponent {
  constructor(private cardStateService: CardStateService) {}

  toggleView(isExpanded: boolean): void {
    this.cardStateService.sendData(isExpanded);
  }
}
