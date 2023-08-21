import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { IFilterDefinition } from 'src/shared/models';

@Injectable()
export class FilterFacadeService {
  private readonly filter$ = new BehaviorSubject<IFilterDefinition[]>(undefined);

  initializeFilterDefinitions(definitions: IFilterDefinition[]): void {
    this.filter$.next(definitions);
  }

  getFilterDefinitions(): Observable<IFilterDefinition[]> {
    return this.filter$.pipe(filter(Boolean));
  }
}
