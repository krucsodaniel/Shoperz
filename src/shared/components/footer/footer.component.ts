import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
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
  usefulLinks = ['About', 'Contact', 'Wishlist', 'Compare', 'FAQ', 'Terms & Conditions', 'Privacy policy', 'Cookie Policy'];
  customerServiceLinks = ['My Account', 'My Cart', 'Track Order', 'Returns & Exchanges', 'Repair Services', 'Support'];

}
