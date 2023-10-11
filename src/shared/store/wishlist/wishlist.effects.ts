import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { WishlistService, ToastService } from '../../services';
import { WishlistActions } from './wishlist.actions';
import { IWishlistItem } from '../../models';
import { TranslateService } from '@ngx-translate/core';


@Injectable()
export class WishlistEffects {
  createFeedback$ = createEffect((): Observable<Action> =>
    this.actions$.pipe(
      ofType(WishlistActions.createWishlist),
      switchMap(({ productId }) => {
        return this.wishlistService.addProductToWishlist(productId)
          .pipe(
            map((product: IWishlistItem) => WishlistActions.wishlistCreated({ wishlistProduct: product })),
            tap(() => this.toastService.showSuccessToast(this.translate.instant('wishlist.productAddedToWishlist'))),
            catchError((error: Error) => of(WishlistActions.errorWishlist({ error }))),
          );
      }),
    ),
  );

  constructor(private actions$: Actions,
              private wishlistService: WishlistService,
              private toastService: ToastService,
              private translate: TranslateService,) {}
}
