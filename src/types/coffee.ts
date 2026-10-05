export type CategoryId = 'all' | 'espresso' | 'pourover' | 'cold' | 'pastries' | 'beans';

export type RoastLevel = 'Light' | 'Medium-Light' | 'Medium' | 'Medium-Dark';

export interface CoffeeItem {
  id: string;
  name: string;
  category: 'espresso' | 'pourover' | 'cold' | 'pastries' | 'beans';
  price: number;
  description: string;
  tastingNotes: string[];
  origin?: string;
  roastLevel?: RoastLevel;
  elevation?: string;
  process?: string;
  isSignature?: boolean;
  isPopular?: boolean;
  calories?: number;
  image?: string;
  dietary?: string[];
  supportsCustomization?: boolean;
}

export interface CustomDrinkOptions {
  size: 'cortado' | 'standard' | 'large'; // 8oz, 12oz, 16oz
  bean: string;
  shots: number;
  milk: string;
  temperature: 'hot' | 'iced';
  sweetness: string;
  syrup: string;
  extraHot?: boolean;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: CoffeeItem;
  quantity: number;
  customization?: CustomDrinkOptions;
  unitPrice: number;
}

export type OrderStatus = 'received' | 'grinding' | 'brewing' | 'ready' | 'completed';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tip: number;
  tax: number;
  total: number;
  fulfillment: 'pickup' | 'delivery';
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress?: string;
  pickupTime: string;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface TableBooking {
  id: string;
  bookingCode: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  guests: number;
  experience: 'tasting-flight' | 'slow-bar-casual' | 'masterclass';
  specialRequests?: string;
  createdAt: string;
}
