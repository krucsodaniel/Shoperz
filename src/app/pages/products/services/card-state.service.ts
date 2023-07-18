import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class CardStateService {
  private toggle$ = new Subject<boolean>();

  sendData(data: boolean): void {
    this.toggle$.next(data);
  }

  getData(): Observable<boolean> {
    return this.toggle$;
  }
}
