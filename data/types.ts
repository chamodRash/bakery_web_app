import { ReactNode } from "react";
export interface DataItem {
    id: number;
    name: string;
    categoryid: number;
    price: number;
    image: string;
    description: string;
    qty: string | number;
  }
  
  export interface CategoryItem {
    id: number;
    name: string;
    img_url: string;
    description: string;
  }
  export interface CartProps  {
    item: DataItem[];
  }

  export interface CarouselProps {
    children: ReactNode[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
    slidesCount: number;
  }