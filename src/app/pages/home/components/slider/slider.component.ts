import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route, ProductCategory } from '@shared-module';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  protected readonly Route = Route;
  protected readonly sliders = [
    {
      class: 'w-ful h-192 m-auto bg-gradient-to-l from-turquoise-200 to-white relative',
      sliderText: 'sliderText1',
      queryParams: { categories: ProductCategory.smartphones },
      imgUrl: './assets/pics/smartphone.png',
      imgAlt: 'smartphone',
    },
    {
      class: 'w-ful h-192 m-auto bg-gradient-to-l from-purple-200 to-white relative',
      sliderText: 'sliderText2',
      queryParams: { categories: ProductCategory.laptopsPcs },
      imgUrl: './assets/pics/controller.png',
      imgAlt: 'controller',
    },
    {
      class: 'h-192 w-ful m-auto bg-gradient-to-l from-red-200 to-white relative',
      sliderText: 'sliderText3',
      queryParams: { categories: ProductCategory.tvAudio },
      imgUrl: './assets/pics/smartwatch.png',
      imgAlt: 'smartwatch',
    },
  ];

  buildTranslationKey(link: string, relativeKey: string): string {
    return `homepage.${ link }.${ relativeKey }`;
  }
}
