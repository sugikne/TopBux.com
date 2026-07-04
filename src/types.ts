export interface RobuxOption {
  id: string;
  amount: number;
  priceIdr: number;
  originalPriceIdr?: number; // for showing a discount badge
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: "Robux" | "Gift Gamepass";
  description: string;
  image: string;
  tag?: string;
  isMaintenance?: boolean;
  startingPrice: string;
}

export interface Testimonial {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
  robuxBought: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface OrderFormData {
  name: string;
  username: string;
  gamepassUrl: string;
  password?: string;
  nominalRobux: number;
  whatsappNumber: string;
  note?: string;
}
