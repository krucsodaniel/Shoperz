import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class CardStateService {
  private toggle$ = new Subject<boolean>();

  setView(data: boolean): void {
    this.toggle$.next(data);
  }

  getView(): Observable<boolean> {
    return this.toggle$;
  }
}
