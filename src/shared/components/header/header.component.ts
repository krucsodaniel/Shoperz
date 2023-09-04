import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../enums';
import { ProductFacadeService } from '../../services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected readonly Route = Route;

  constructor(private productFacadeService: ProductFacadeService) {}

  buildTranslationKey(relativeKey: string): string {
    return `sharedComponents.header.${ relativeKey }`;
  }

  resetFiltering(): void {
    this.productFacadeService.resetFiltering();
  }
}
