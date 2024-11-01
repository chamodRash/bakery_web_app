"use client";

import { ordersProps } from "@/data/types";

interface OrdersPageSectionProps {
  orders: ordersProps[];
}

const OrdersPageSection = ({ orders }: OrdersPageSectionProps) => {
  return <div>Orders</div>;
};

export default OrdersPageSection;
