export type AdminData = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
};

export type ProductData = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Record<string, number>;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Record<string, string | number>[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Record<string, string>;
  thumbnail: string;
  images: string[];
};
