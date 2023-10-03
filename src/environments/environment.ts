export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      products: '/products',
      categories: '/categories',
      brands: '/brands',
      cart: '/cart',
      feedbacks: '/feedbacks',
      orders: '/orders',
    },
  },
  redirectUrls: {
    facebookUrl: 'https://www.facebook.com/',
    instagramUrl: 'https://www.instagram.com/',
    linkedinUrl: 'https://www.linkedin.com/',
    twitterUrl: 'https://www.twitter.com/',
    youtubeUrl: 'https://www.youtube.com/',
  }
};
