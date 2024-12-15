"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type orderItem = {
  name: string;
  qty: number;
  price: number;
  total: number;
};

export const columns: ColumnDef<orderItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "qty",
    header: "Qty",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
