"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type onlineOrderItem = {
  name: string;
  orderItems: any[];
  deliveryAddress: string;
  deliveryDate: string;
  paymentMethod: string;
  actions: any;
};

export const OnlineOrdersColumns: ColumnDef<onlineOrderItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "orderItems",
    header: "Order Items",
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
  },
  {
    accessorKey: "deliveryDate",
    header: "Delivery Date",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "actions",
    header: "Actions",
  },
];
