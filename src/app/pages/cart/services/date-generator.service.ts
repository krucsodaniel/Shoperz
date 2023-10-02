import { Injectable } from '@angular/core';

@Injectable()
export class DateGeneratorService {
  generateOrderDate(): number {
    return Date.now();
  }
}
