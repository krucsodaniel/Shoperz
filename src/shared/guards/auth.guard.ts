import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Route } from '@shared-module';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (): boolean => {
  const router = inject(Router);
  const isIdInLocalStorage = localStorage.getItem('userId');

  if(isIdInLocalStorage) {
    router.navigate([Route.products]);
    return false;
  }

  return true;
};
