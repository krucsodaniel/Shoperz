import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ActionDispatcherService, ICategory } from '@shared-module';
import { CategoryService } from './category.service';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '../../store';
import { CategoryActionKey } from '../../enums';

@Injectable()
export class CategoryFacadeService {
  constructor(
    private categoryService: CategoryService,
    private store: Store,
    private actionDispatcherService: ActionDispatcherService,
  ) {}

  async initCategoriesState(): Promise<void> {
    return await this.actionDispatcherService.dispatchAsync(
      CategoryActions.loadCategories(),
      CategoryActionKey.loadCategories,
    );
  }

  getCategories(): Observable<ICategory[]> {
    return this.store.select(CategorySelectors.selectCategories)
      .pipe(filter(Boolean));
  }
}
