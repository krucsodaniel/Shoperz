import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { Route } from '../../enums';
import { CartFacadeService, ProductFacadeService, UserFacadeService } from '../../services';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-middle-header',
  templateUrl: 'middle-header.component.html',
  styleUrls: ['./middle-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MiddleHeaderComponent implements OnInit {
  amountInCart$: Observable<number>;
  amountOnWishlist$: Observable<number>;
  user: IUser;
  isDropdownOpened = false;
  protected readonly Route = Route;

  constructor(
    private cartFacadeService: CartFacadeService,
    private productFacadeService: ProductFacadeService,
    private userFacadeService: UserFacadeService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.amountInCart$ = this.cartFacadeService.getTotalAmountOfProductsInCart();
    this.amountOnWishlist$ = this.productFacadeService.getTotalAmountOnWishlist();

    this.userFacadeService.selectUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user: IUser) => {
        this.user = user;
        this.cdr.detectChanges();
      });
  }

  toggleDropdown(): void {
    this.isDropdownOpened = !this.isDropdownOpened;
    this.cdr.detectChanges();
  }

  navigateToLogin(): void {
    this.router.navigate([Route.login]);
  }

  logOut(): void {
    this.userFacadeService.logoutUser();

    this.router.navigate([Route.login]);
    this.toggleDropdown();
  }

  buildTranslationKeyForPanel(label: string): string {
    return `profilePage.${ label }`;
  }
}
