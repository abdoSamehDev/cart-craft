const fetchProductById = (id: number) => {
  // Here you would normally fetch from an API or data source
  return {
    id: 1,
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation and long-lasting battery life.',
    category: 'Electronics',
    price: 199.99,
    discountPercentage: 20,
    rating: 4.5,
    stock: 25,
    tags: ['wireless', 'bluetooth', 'headphones', 'electronics'],
    brand: 'SoundMagic',
    sku: 'SM-12345',
    weight: 300,
    dimensions: { width: 15, height: 20, depth: 5 },
    warrantyInformation: '2-year warranty',
    shippingInformation: 'Free shipping within 5-7 business days',
    availabilityStatus: 'In Stock',
    reviews: [
      {
        name: 'John Doe',
        rating: 5,
        date: '2024-08-01',
        comment: 'Amazing sound quality and very comfortable to wear!',
      },
      {
        name: 'Jane Smith',
        rating: 4,
        date: '2024-08-02',
        comment: 'Great headphones but the battery life could be better.',
      },
    ],
    returnPolicy: '30-day return policy',
    minimumOrderQuantity: 1,
    meta: { color: 'Black', material: 'Plastic' },
    thumbnail: 'https://via.placeholder.com/300',
    images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/400'],
  };
};
export default fetchProductById;