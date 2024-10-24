import { ReactNode } from "react";

export interface DataItem {
  id: number;
  slug: string;
  name: string;
  categoryid: number;
  price: number;
  image: string;
  description: string;
  qty: string | number;
}

export interface CategoryItem {
  id: number;
  slug: string;
  name: string;
  img_url: string;
  description: string;
}

export interface CartProps {
  item: DataItem[];
}

export interface carouselItemsProps {
  id: number;
  name: string;
  image: string;
  status: string;
  buttonCaption: string;
}

export interface CarouselProps {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slidesCount: number;
}

export interface UserProps {
  id: string;
  updated_at: Date;
  phone: string;
  name: string;
  role: string;
  passwordverified: Date;
  address: string;
  loyaltypoints: number;
}

export interface ordersProps {
  id: number;
  total: number;
  status: string;
  deliverydatetime: Date;
  deliveryaddress: string;
  paymentmethod: string;
  orderitem: {
    id: number;
    productid: number;
    quantity: number;
    total: number;
  }[];
}
