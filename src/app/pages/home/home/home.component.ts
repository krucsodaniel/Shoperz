import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly shopFeatures = [
    {
      imageLink: 'guarantee',
      translationKeyLink: 'shopFeatures',
      titleRelativeKey: 'guarantee',
      detailsRelativeKey: 'guaranteeDuration',
    },
    {
      imageLink: 'paying',
      translationKeyLink: 'shopFeatures',
      titleRelativeKey: 'ratePaying',
      detailsRelativeKey: 'ratePayingDuration',
    },
    {
      imageLink: 'payments',
      translationKeyLink: 'shopFeatures',
      titleRelativeKey: 'payments',
      detailsRelativeKey: 'secured',
    },
    {
      imageLink: 'delivery',
      translationKeyLink: 'shopFeatures',
      titleRelativeKey: 'delivery',
      detailsRelativeKey: 'deliveryCondition',
    },
    {
      imageLink: 'brands',
      translationKeyLink: 'shopFeatures',
      titleRelativeKey: 'brands',
      detailsRelativeKey: 'brandsText',
    }
  ];

  brandExpose = ['gama', 'technova', 'indiezone', 'tracic', 'gomezbuzz', 'shopania', 'imade', 'upside', 'wofact', 'gamerzone'];

  buildTranslationKey(link: string, relativeKey: string): string {
    return `homepage.${ link }.${ relativeKey }`;
  }
}
