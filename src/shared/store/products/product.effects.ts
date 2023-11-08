import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, ProductService } from '../../services';
import { ProductActionEnum } from '../../enums';
import { IProduct } from '../../models';
import { ProductActions } from './product.actions';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect((): Observable<Action> =>
    this.actions$
      .pipe(
        ofType(ProductActions.loadProducts),
        switchMap(() => {
          return this.productService.getProducts()
            .pipe(
              map((products: IProduct[]) => ProductActions.productsLoaded({ products })),
              tap(() => this.actionTrackerService.sendAction(ProductActionEnum.loadProducts)),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(ProductActionEnum.loadProducts, error);
                return EMPTY;
              }),
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
              tap(() => this.actionTrackerService.sendAction(ProductActionEnum.loadProductById)),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(ProductActionEnum.loadProductById, error);
                return EMPTY;
              }),
            );
        }),
      )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private actionTrackerService: ActionTrackerService,
  ) {}
}
