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
      title: 'TV & audio',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId1' },
    },
    {
      title: 'Smartphones',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId2' },
    },
    {
      title: 'Laptops & PC',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId3' },
    },
    {
      title: 'Gadgets',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId4' },
    },
    {
      title: 'Photo & Video',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId5' },
    },
    {
      title: 'Gifts',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId6' },
    },
    {
      title: 'Books',
      routerLink: `/${ Route.products }`,
      queryParams: { categories: 'categoryId7' },
    },
    {
      title: 'Toys',
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
      title: 'terms & conditions',
      routerLink: `/${ Route.terms }`,
    },
    {
      title: 'privacy policy',
      routerLink: `/${ Route.privacyPolicy }`,
    },
    {
      title: 'cookie policy',
      routerLink: `/${ Route.cookiePolicy }`,
    },
  ];
  readonly customerServiceLinks = [
    {
      title: 'my account',
      routerLink: `/${ Route.account }`,
    },
    {
      title: 'my cart',
      routerLink: `/${ Route.cart }`,
    },
    {
      title: 'track order',
      routerLink: `/${ Route.trackOrder }`,
    },
    {
      title: 'returns & exchanges',
      routerLink: `/${ Route.returns }`,
    },
    {
      title: 'repair services',
      routerLink: `/${ Route.repairServices }`,
    },
    {
      title: 'support',
      routerLink: `/${ Route.support }`,
    },
  ];

  buildTranslationKey(link: string, relativeKey: string): string {
    return `sharedComponents.footer.${ link }.${ relativeKey.toLowerCase() }`;
  }
}
