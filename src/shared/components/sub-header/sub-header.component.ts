import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductFacadeService, Route } from '@shared-module';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubHeaderComponent {
  protected readonly Route = Route;

  constructor(private productFacadeService: ProductFacadeService) {}

  buildTranslationKey(relativeKey: string): string {
    return `sharedComponents.header.${ relativeKey }`;
  }

  resetFiltering(): void {
    this.productFacadeService.resetFiltering();
  }
}
