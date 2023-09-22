export const environmentProd = {
  production: true,
  api: {
    baseUrl: 'http://localhost:3000',
    endpoints: {
      products: '/product',
      categories: '/categories',
      brands: '/brands',
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
