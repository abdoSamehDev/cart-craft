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

type ProductDimensions = {
  width: number;
  height: number;
  depth: number;
};

type ProductReview = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type ProductMeta = {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
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
  brand?: string;
  sku: string;
  weight: number;
  dimensions: ProductDimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: ProductReview[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: ProductMeta;
  thumbnail: string;
  images: string[];
};

export type ProductsApiResponse = {
  products: ProductData[];
  total: number;
  skip: number;
  limit: number;
};
export type ProductFromData = {
  title: string;
  description: string;
  brand: string;
  price: string;
  stock: string;
  tags: string;
};

export type UseProductsReturnType = {
  products: ProductData[];
  product: ProductData | null;
  loading: boolean;
  error: string | null;
  total: number | null;
  skip: number;
  limit: number;
  fetchAllProducts: (limit?: number, skip?: number) => Promise<void>;
  fetchProductById: (id: number) => Promise<void>;
  searchProducts: (
    query: string,
    limit?: number,
    skip?: number,
  ) => Promise<void>;
  fetchProductsByCategory: (category: string) => Promise<void>;
  sortProducts: (
    sortBy: string,
    order: "asc" | "desc",
    limit?: number,
    skip?: number,
  ) => Promise<void>;
  fetchCategories: () => Promise<string[]>;
  createProduct: (newProduct: Partial<ProductData>) => Promise<void>;
  updateProduct: (
    id: number,
    updatedProduct: Partial<ProductData>,
  ) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
};

export type ProductInCart = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
};

export type Cart = {
  id?: number;
  products: ProductInCart[];
  total: number;
  discountedTotal: number;
  userId?: number;
  totalProducts: number;
  totalQuantity: number;
};

export type UseCartsReturnType = {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addToCart: (product: ProductInCart) => void;
  removeFromCart: (productId: number) => void;
  updateCart: (
    cartId: number,
    products: ProductInCart[],
    merge?: boolean,
  ) => Promise<void>;
  updateCartProductQuyantity: (productId: number, newQuantity: number) => void;
  deleteCart: (cartId: number) => Promise<void>;
  checkAndRemoveEmptyCart: () => void;
  getCart: () => Cart | null;
};
