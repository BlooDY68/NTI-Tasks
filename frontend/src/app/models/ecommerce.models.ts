export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Customer';
  profileImage?: string;
  createdAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category | string;
  brand: string;
  stock: number;
  image: string;
  createdAt?: string;
}

export interface CartItem {
  _id?: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  product: Product | string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  _id: string;
  user: User | string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'Cash on Delivery' | 'Credit Card' | 'PayPal';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  totalAmount: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}
