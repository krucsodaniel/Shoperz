import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  currentRate: number;
  selectedStarIndex: number;

  @Output()
  readonly changeRate = new EventEmitter<number>();

  @HostBinding('class')
  private readonly classes = 'flex mt-2 mb-5';

  onStarRate(index: number): void {
    this.selectedStarIndex = index;
    this.currentRate = index + 1;
    this.changeRate.emit(this.currentRate);
  }
}
