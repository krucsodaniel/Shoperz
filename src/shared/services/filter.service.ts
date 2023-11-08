import { Injectable } from '@angular/core';
import {
  IBrand,
  ICategory,
  ICalculatedProduct,
  IFilterOption,
  IFilterDefinition,
} from '../models';
import { ProductFilterOption, FilterActionEnum } from '../enums';
import {
  CategoryFacadeService,
  BrandFacadeService,
  FilterFacadeService,
  ActionDispatcherService,
} from '../services';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { FilterActions } from '../store/filters';

@Injectable()
export class FilterService {
  constructor(
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private filterFacadeService: FilterFacadeService,
    private translate: TranslateService,
    private store: Store,
    private actionDispatcherService: ActionDispatcherService,
  ) {}

  async initializeFilterDefinitions(): Promise<void> {
    const brands = await firstValueFrom(this.brandFacadeService.getBrands());
    const categories = await firstValueFrom(this.categoryFacadeService.getCategories());

    const filterDefinitions: IFilterDefinition[] = [
      {
        id: ProductFilterOption.categories,
        propertySelector: (product: ICalculatedProduct) => product.categoryId,
        label: this.translate.instant('filter.allCategories'),
        options: [
          {
            id: 'all',
            value: this.translate.instant('filter.all'),
          },
          ...categories.map((category: ICategory) => ({
            id: category.id,
            value: category.name,
          }))
        ],
      },
      {
        id: ProductFilterOption.brands,
        propertySelector: (product: ICalculatedProduct) => product.brandId,
        label: this.translate.instant('filter.allBrands'),
        options: brands.map((brand: IBrand) => ({
          id: brand.id,
          value: brand.name,
        })),
        get selectedOption(): IFilterOption {
          return this.options[0];
        },
        multiselect: true,
      },
      {
        id: ProductFilterOption.prices,
        propertySelector: (product: ICalculatedProduct) => product.price,
        label: this.translate.instant('filter.allPrice'),
        options: [
          {
            id: '<50',
            value: '<50',
            customFilterFn: (price: number) => price < 50,
          },
          {
            id: '100-200',
            value: '100-200',
            customFilterFn: (price: number) => price > 100 && price < 200,
          },
          {
            id: '200-300',
            value: '200-300',
            customFilterFn: (price: number) => price > 200 && price < 300,
          },
          {
            id: '300-400',
            value: '300-400',
            customFilterFn: (price: number) => price > 300 && price < 400,
          },
          {
            id: '>500',
            value: '>500',
            customFilterFn: (price: number) => price > 500,
          },
        ],
      },
    ];

    return await this.actionDispatcherService.dispatchAsync(
      FilterActions.initializeFilters({ filterDefinitions }),
      FilterActionEnum.loadFilters,
    );
  }
}
