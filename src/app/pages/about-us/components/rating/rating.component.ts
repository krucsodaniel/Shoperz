import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingComponent {
  @Output() currentRateEvent = new EventEmitter<number>();
  currentRate: number;
  selectedStarIndex: number;

  onStarRate(i: number):void {
    this.selectedStarIndex = i;
    this.currentRate = i + 1;
    this.currentRateEvent.emit(this.currentRate);
  }
}
