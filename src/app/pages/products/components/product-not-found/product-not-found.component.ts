import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-not-found',
  templateUrl: './product-not-found.component.html',
  styleUrls: ['./product-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductNotFoundComponent {
  buildTranslationKey(relativeKey: string): string {
    return `general.${ relativeKey }`;
  }
}
