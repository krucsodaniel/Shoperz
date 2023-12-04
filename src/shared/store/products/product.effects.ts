import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActionTrackerService, ProductService, ToastService } from '../../services';
import { ProductActionKey } from '../../enums';
import { IProduct } from '../../models';
import { ProductActions } from './product.actions';
import { catchError, EMPTY, map, Observable, switchMap, tap } from 'rxjs';
import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

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
              tap(() => this.actionTrackerService.sendAction(ProductActionKey.loadProducts)),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(ProductActionKey.loadProducts, error);
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
              tap(() => this.actionTrackerService.sendAction(ProductActionKey.loadProductById)),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(ProductActionKey.loadProductById, error);
                return EMPTY;
              }),
            );
        }),
      )
  );

  toggleProductOnWishlist$ = createEffect((): Observable<Action> =>
    this.actions$
      .pipe(
        ofType(ProductActions.toggleProductOnWishlist),
        switchMap(({ productId, isOnWishlist }) => {
          return this.productService.updateProductWishlistProperty(productId, isOnWishlist)
            .pipe(
              map(() => ProductActions.productToggledToWishlist({ productId, isOnWishlist })),
              tap(() => this.toastService.showSuccessToast(isOnWishlist
                ? this.translate.instant('wishlist.productAddedToWishlist')
                : this.translate.instant('wishlist.productRemovedFromWishlist'))),
              catchError((error: HttpErrorResponse) => {
                this.actionTrackerService.sendAction(ProductActionKey.toggleOnWishlist, error);
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
    private toastService: ToastService,
    private translate: TranslateService,
  ) {}
}
