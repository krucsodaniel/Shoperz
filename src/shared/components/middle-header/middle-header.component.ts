import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../enums';
import { ProductFacadeService } from '../../services';

@Component({
  selector: 'app-middle-header',
  templateUrl: 'middle-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiddleHeaderComponent {
  protected readonly Route = Route;

  constructor(private productsFacadeService: ProductFacadeService) {}

  resetFiltering(): void {
    this.productsFacadeService.resetFiltering();
  }
}
