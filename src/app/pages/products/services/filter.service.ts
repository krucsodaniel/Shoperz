import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { IFilterDefinition } from 'src/shared/models';

@Injectable()
export class FilterService<Type = any> {
  private readonly filter$ = new BehaviorSubject<IFilterDefinition[]>(undefined);

  initializeFilterDefinitions(definitions: IFilterDefinition<Type>[]): void {
    this.filter$.next(definitions);
  }

  getFilterDefinitions(): Observable<IFilterDefinition<Type>[]> {
    return this.filter$.pipe(filter(Boolean));
  }
}
