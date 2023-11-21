import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  private readonly toastConfigObject = {
    positionClass: 'toast-bottom-center',
  };

  constructor(private toastr: ToastrService) {}

  showSuccessToast(message: string): void {
    this.toastr.success(message, '', this.toastConfigObject);
  }

  showErrorToast(message: string): void {
    this.toastr.error(message, '', this.toastConfigObject);
  }
}
