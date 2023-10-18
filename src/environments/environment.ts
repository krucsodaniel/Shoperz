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
  },
  firebase: {
    apiKey: "AIzaSyCX-QhUKmVOMy5dE7jUXI8rMnk1zfvHCCA",
    authDomain: "shoperz-7ff36.firebaseapp.com",
    projectId: "shoperz-7ff36",
    storageBucket: "shoperz-7ff36.appspot.com",
    messagingSenderId: "561182531709",
    appId: "1:561182531709:web:4c4e93e349cc05644f9114"
  },
};
