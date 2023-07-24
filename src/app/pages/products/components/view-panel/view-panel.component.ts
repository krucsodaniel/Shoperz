import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-panel',
  templateUrl: './view-panel.component.html',
  styleUrls: ['./view-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewPanelComponent {
  @Input()
  isLoading: boolean;
}
