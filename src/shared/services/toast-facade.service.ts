import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ToastMessage } from '../enums';

@Injectable()
export class ToastFacadeService {
  private readonly toastConfigObject = {
    positionClass: 'toast-bottom-center',
  };

  constructor(private toastr: ToastrService, private translate: TranslateService) {}

  productAddedToCartMessage(): void {
    this.toastr.success(
      this.translate.instant(ToastMessage.addedToCart), '', this.toastConfigObject);
  }

  productAmountUpdatedMessage(): void {
    this.toastr.info(
      this.translate.instant(ToastMessage.amountUpdated), '', this.toastConfigObject);
  }

  productIsAlreadyInCartMessage(): void {
    this.toastr.warning(
      this.translate.instant(ToastMessage.alreadyInCart), '', this.toastConfigObject);
  }

  productRemovedFromCartMessage(): void {
    this.toastr.error(
      this.translate.instant(ToastMessage.removedFromCart), '', this.toastConfigObject);
  }
}
