import { ProductCategory } from '../enums';

export interface ISlider {
  class: string;
  sliderText: string;
  queryParams: { categories: ProductCategory },
  imgUrl: string;
  imgAlt: string;
}
