import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route, ProductCategory } from '@shared-module';
import { ISlider } from '@shared-module';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  protected readonly route = Route;
  protected readonly sliders: ISlider[] = [
    {
      class: 'from-turquoise-200 to-white',
      sliderText: 'sliderText1',
      queryParams: { categories: ProductCategory.smartphones },
      imgUrl: './assets/pics/smartphone.png',
      imgAlt: 'smartphone',
    },
    {
      class: 'from-purple-200 to-white',
      sliderText: 'sliderText2',
      queryParams: { categories: ProductCategory.laptopsPcs },
      imgUrl: './assets/pics/controller.png',
      imgAlt: 'controller',
    },
    {
      class: 'from-red-200 to-white',
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
