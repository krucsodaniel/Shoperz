import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastService {
  private readonly toastConfigObject = {
    positionClass: 'toast-bottom-center',
  };

  constructor(private toastr: ToastrService, private translate: TranslateService) {}

  showToastMessage(type: string): void {
    switch (type) {
      case 'productAddedToCart':
        this.toastr.success(this.translate.instant('cart.productAddedToCart'), '', this.toastConfigObject);
        return;

      case 'productAmountUpdated':
        this.toastr.info(this.translate.instant('cart.productAmountUpdated'), '', this.toastConfigObject);
        return;

      case 'productRemovedFromCart':
        this.toastr.error(this.translate.instant('cart.productRemovedFromCart'), '', this.toastConfigObject);
        return;

      case 'productAlreadyInCart':
        this.toastr.warning(this.translate.instant('cart.productIsAlreadyInCart'), '', this.toastConfigObject);
        return;
    }
  }
}
