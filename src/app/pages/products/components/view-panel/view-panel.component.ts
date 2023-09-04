import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-view-panel',
  templateUrl: './view-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPanelComponent {}
