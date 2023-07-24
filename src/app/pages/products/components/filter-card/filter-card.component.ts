import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-filter-card',
  templateUrl: './filter-card.component.html',
  styleUrls: ['./filter-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterCardComponent {
  filters: string[] = ['Categories', 'Brands', 'Prices',];
  categories: string[] = ['All', 'TV&Audio', 'Smartphones', 'Laptops & PC', 'Gadgets', 'Photo & Video', 'Gifts', 'Books', 'Toys',];
  brands: string[] = ['Apple', 'Samsung', 'LG', 'Huawei', 'Lenovo', 'Nokia',];
  prices: string[] = [
    '<50',
    '100-200',
    '200-300',
    '300-400',
    '400-500',
    '>500',
  ];

  buildTranslationKey(relativeKey: string): string {
    return `prices.${ relativeKey }`;
  }
}
