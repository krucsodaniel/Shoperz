import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { UserService } from '../services';
import { catchError, map, Observable, of } from 'rxjs';
import { IUser } from '../models';

@Injectable()
export class ExistingEmailValidatorService implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.userService.getUserByEmail(control.value)
      .pipe(
        map((user: IUser) => {
          return user
            ? null
            : { existingEmail: { isExisting: false } };
        }),
        catchError(() => of({ existingEmail: { unknownError: true } })),
      )
  }
}
