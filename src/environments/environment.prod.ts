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
};
