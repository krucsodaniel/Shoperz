import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  categoriesLinks = [
    {
      title: 'TV & audio',
      routerLink: '/products',
      queryParams: { categories: 'categoryId1' }
    },
    {
      title: 'Smartphones',
      routerLink: '/products',
      queryParams: { categories: 'categoryId2' }
    },
    {
      title: 'Laptops & PCs',
      routerLink: '/products',
      queryParams: { categories: 'categoryId3' }
    },
    {
      title: 'Gadgets',
      routerLink: '/products',
      queryParams: { categories: 'categoryId4' }
    },
    {
      title: 'Photo & Video',
      routerLink: '/products',
      queryParams: { categories: 'categoryId5' }
    },
    {
      title: 'Gifts',
      routerLink: '/products',
      queryParams: { categories: 'categoryId6' }
    },
    {
      title: 'Books',
      routerLink: '/products',
      queryParams: { categories: 'categoryId7' }
    },
    {
      title: 'Toys',
      routerLink: '/products',
      queryParams: { categories: 'categoryId8' }
    },
  ];
  usefulLinks = ['about', 'contact', 'wishlist', 'compare', 'FAQ', 'terms & conditions', 'privacy policy', 'cookie policy'];
  customerServiceLinks = ['my account', 'my cart', 'track order', 'returns & exchanges', 'repair services', 'support'];

}
