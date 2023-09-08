import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services';
import { ProductActions } from './product.actions';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { IProduct } from '@shared-module';
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

  loadProductById$ = createEffect((): Observable<Action> =>
    this.actions$
      .pipe(
        ofType(ProductActions.loadProductById),
        switchMap(({ productId }) => {
          return this.productService.getProductById(productId)
            .pipe(
              map((product: IProduct) => ProductActions.productByIdLoaded({ product })),
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
