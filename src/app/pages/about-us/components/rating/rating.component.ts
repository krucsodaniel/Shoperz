import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  @Output()
  readonly changeRate = new EventEmitter<number>();

  currentRate: number;
  selectedStarIndex: number;

  onStarRate(index: number): void {
    this.selectedStarIndex = index;
    this.currentRate = index + 1;
    this.changeRate.emit(this.currentRate);
  }
}
