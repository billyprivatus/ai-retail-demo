import { faker } from '@faker-js/faker';
import { Product } from './ProductList';

export const generateMockProducts = (amount: number) => {
  const products: Product[] = [...new Array(amount)].map((_, index) => {
    return {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: `$${faker.commerce.price()}`,
      // images: [{ url: faker.image.urlLoremFlickr({ category: 'cars' }) }],
      images: [{ url: `/home/nike_${index % 8}.webp` }],
      category: faker.commerce.productAdjective(),
    };
  });

  return products;
};
