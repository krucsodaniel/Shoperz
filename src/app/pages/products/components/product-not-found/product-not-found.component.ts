import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-product-not-found',
  templateUrl: './product-not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductNotFoundComponent {
  @HostBinding('class')
  private readonly classes = 'mx-auto';

  buildTranslationKey(relativeKey: string): string {
    return `general.${ relativeKey }`;
  }
}
