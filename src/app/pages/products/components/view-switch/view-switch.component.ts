import { ChangeDetectionStrategy, Component, OnInit, inject, DestroyRef, HostBinding } from '@angular/core';
import { CardStateService } from '../../services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-view-switch',
  templateUrl: './view-switch.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewSwitchComponent implements OnInit {
  isExpanded = false;

  @HostBinding('class')
  private readonly classes = 'bg-grey-100';
  
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
