import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../enums';
import { ProductFacadeService } from '../../services';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly Route = Route;

  constructor(private productsFacadeService: ProductFacadeService) {}

  resetFiltering(): void {
    this.productsFacadeService.resetFiltering();
  }
}
