import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services';
import { ProductActions } from './index';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { IProduct } from 'src/shared/models';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect((): Observable<Action> =>
    this.actions$
      .pipe(
        ofType(ProductActions.loadProducts),
        switchMap(() => {
          return this.productService.getProducts()
            .pipe(
              map((products: IProduct[]) => ProductActions.productsLoaded({ products: products })),
              catchError((error) => of(ProductActions.errorProduct({ error: new Error(error) }))),
            );
        }),
      )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {}
}
