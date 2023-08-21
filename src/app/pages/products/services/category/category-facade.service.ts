import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ICategory } from 'src/shared/models';
import { CategoryService } from './category.service';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '../../store';

@Injectable()
export class CategoryFacadeService {
  constructor(private categoryService: CategoryService, private store: Store) {}

  initCategoriesState(): void {
    this.store.dispatch(CategoryActions.loadCategories());
  }

  getCategories(): Observable<ICategory[]> {
    return this.store.select(CategorySelectors.selectCategories)
      .pipe(filter(Boolean));
  }
}
