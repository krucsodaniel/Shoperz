import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StoreInitializationService } from 'src/shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private storeInitializationService: StoreInitializationService) {}

  ngOnInit(): void {
    this.storeInitializationService.initializeStore();
  }
}
