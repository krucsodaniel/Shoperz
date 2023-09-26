import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route } from '../../enums';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly redirectUrls = environment.redirectUrls;
  readonly categoriesLinks = [
    {
      title: 'tvAndAudio',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId1' },
    },
    {
      title: 'smartphones',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId2' },
    },
    {
      title: 'laptopsAndPc',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId3' },
    },
    {
      title: 'gadgets',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId4' },
    },
    {
      title: 'photoAndVideo',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId5' },
    },
    {
      title: 'gifts',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId6' },
    },
    {
      title: 'books',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId7' },
    },
    {
      title: 'toys',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId8' },
    },
  ];
  readonly usefulLinks = [
    {
      title: 'about',
      routerLink: `/${ Route.about }`,
    },
    {
      title: 'contact',
      routerLink: `/${ Route.contact }`,
    },
    {
      title: 'wishlist',
      routerLink: `/${ Route.wishlist }`,
    },
    {
      title: 'compare',
      routerLink: `/${ Route.compare }`,
    },
    {
      title: 'faq',
      routerLink: `/${ Route.faq }`,
    },
    {
      title: 'termsAndConditions',
      routerLink: `/${ Route.terms }`,
    },
    {
      title: 'privacyPolicy',
      routerLink: `/${ Route.privacyPolicy }`,
    },
    {
      title: 'cookiePolicy',
      routerLink: `/${ Route.cookiePolicy }`,
    },
  ];
  readonly customerServiceLinks = [
    {
      title: 'myAccount',
      routerLink: `/${ Route.account }`,
    },
    {
      title: 'myCart',
      routerLink: `/${ Route.cart }`,
    },
    {
      title: 'trackOrder',
      routerLink: `/${ Route.trackOrder }`,
    },
    {
      title: 'returnsAndExchanges',
      routerLink: `/${ Route.returns }`,
    },
    {
      title: 'repairServices',
      routerLink: `/${ Route.repairServices }`,
    },
    {
      title: 'support',
      routerLink: `/${ Route.support }`,
    },
  ];

  buildTranslationKey(link: string, relativeKey: string): string {
    return `sharedComponents.footer.${ link }.${ relativeKey }`;
  }
}
