import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';
import { UserService } from '../services';
import { IUser } from '../models';

@Injectable()
export class UniqueEmailValidatorService implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.getUserByEmail(control.value)
      .pipe(
        map((user: IUser) => {
          return user
            ? { uniqueEmail: { isTaken: true } }
            : null;
        }),
        catchError(() => of({ uniqueEmail: { unknownError: true } })),
      )
  }
}
