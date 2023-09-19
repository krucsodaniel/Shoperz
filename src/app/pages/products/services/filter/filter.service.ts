import { Injectable } from '@angular/core';
import { FilterFacadeService } from '../../services';
import {
  IBrand,
  ICategory,
  ICalculatedProduct,
  IFilterOption,
  IFilterDefinition,
  ProductFilterOption,
  SortingOption,
  CategoryFacadeService,
  BrandFacadeService,
} from '@shared-module';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../store';

@Injectable()
export class FilterService {
  constructor(
    private categoryFacadeService: CategoryFacadeService,
    private brandFacadeService: BrandFacadeService,
    private filterFacadeService: FilterFacadeService,
    private translate: TranslateService,
    private store: Store,
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
        label: this.translate.instant('filter.allPrices'),
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

    this.store.dispatch(FilterActions.initializeFilters({ filterDefinitions }));

    this.store.dispatch(FilterActions.setSortingOption({ sortingOption: SortingOption.default }));

    this.store.dispatch(FilterActions.setSearch({ searchValue: '' }));
  }
}
