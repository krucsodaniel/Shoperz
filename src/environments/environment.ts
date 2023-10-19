import { firebaseKeysConfig } from '../../firebase-keys.config';

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
    apiKey: firebaseKeysConfig.FIREBASE_API_KEY,
    authDomain: firebaseKeysConfig.FIREBASE_AUTH_DOMAIN,
    projectId: firebaseKeysConfig.FIREBASE_PROJECT_ID,
    storageBucket: firebaseKeysConfig.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: firebaseKeysConfig.FIREBASE_MESSAGING_SENDER_ID,
    appId: firebaseKeysConfig.FIREBASE_APP_ID,
  },
};
