"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ordersProps } from "@/data/types";
import VerifyOrder from "@/components/admin/verify-order";

type Props = {
  data: ordersProps[];
};

export function OnlineOrdersDataTable({ data }: Props) {
  return (
    <Table>
      <TableCaption>Stocks</TableCaption>
      <TableHeader>
        <TableHead>ID</TableHead>
        <TableHead>Items</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell
              rowSpan={
                item.orderitem.length - 1 === 0 ? 1 : item.orderitem.length - 1
              }>
              {item.id}
            </TableCell>
            <TableCell className="space-y-2">
              {item.orderitem.map((orderItem) => (
                <div key={orderItem.id} className="flex items-center gap-x-2">
                  <img
                    src={orderItem.product.image}
                    alt={orderItem.product.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                  <span>{orderItem.product.name}</span>
                  <p>{orderItem.quantity}</p>
                </div>
              ))}
            </TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>
              <div className="w-full flex items-center gap-x-5">
                <Button variant={"outline"} size={"sm"}>
                  Notify
                </Button>
                <VerifyOrder order={data}>
                  <Button variant={"default"} size={"sm"}>
                    Verify
                  </Button>
                </VerifyOrder>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
