import { Component } from '@angular/core';
import { CardStateService } from '../../services';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['view-switch.component.scss']
})
export class ViewSwitchComponent {
  isRowView = false;

  constructor(private cardStateService: CardStateService) {}

  toggleView(isExpanded: boolean): void {
    this.cardStateService.sendData(isExpanded);
    this.isRowView = isExpanded;
  }
}
