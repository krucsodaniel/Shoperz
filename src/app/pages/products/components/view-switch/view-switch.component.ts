import { ChangeDetectionStrategy, Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CardStateService } from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  styleUrls: ['view-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSwitchComponent implements OnInit {
  isExpanded = false;

  private readonly destroyRef = inject(DestroyRef);

  constructor(private cardStateService: CardStateService) {}

  ngOnInit() {
    this.cardStateService.getView()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isExpanded: boolean) => this.isExpanded = isExpanded);
  }

  toggleView(isExpanded: boolean): void {
    this.cardStateService.setView(isExpanded);
  }
}
