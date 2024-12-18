"use client";

import { useState } from "react";
import { ordersProps } from "@/data/types";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface OrdersPageSectionProps {
  orders: ordersProps[];
}

const OrdersPageSection = ({ orders }: OrdersPageSectionProps) => {
  const [activeTab, setActiveTab] = useState("all");

  const allOrders = orders;
  const toPayOrders = orders.filter(
    (order) => order.status === "unpaid" && order.paymentmethod === "card"
  );
  const toPickOrders = orders.filter(
    (order) =>
      order.paymentmethod === "cash" ||
      (order.paymentmethod === "card" && order.status === "paid")
  );
  const pickedOrders = orders.filter((order) => order.status === "picked");

  console.log(toPayOrders);

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="all">All Orders</TabsTrigger>
        <TabsTrigger value="to-pay">To Pay</TabsTrigger>
        <TabsTrigger value="to-pick">To Pick</TabsTrigger>
        <TabsTrigger value="picked">Picked Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <OrderList orders={allOrders} />
      </TabsContent>
      <TabsContent value="to-pay">
        <OrderList orders={toPayOrders} />
      </TabsContent>
      <TabsContent value="to-pick">
        <OrderList orders={toPickOrders} />
      </TabsContent>
      <TabsContent value="picked">
        <OrderList orders={pickedOrders} />
      </TabsContent>
    </Tabs>
  );
};

function OrderList({ orders }: { orders: ordersProps[] }) {
  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="bg-card rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Order #{order.id}</h2>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground">
              {order.status}
            </span>
          </div>
          <p className="text-muted-foreground mb-4">
            Payment Method:{" "}
            {order.paymentmethod === "card" ? "Card Payment" : "Cash Payment"}
          </p>
          <div className="grid gap-4 mb-4">
            {order.orderitem.map((item) => (
              <Link
                href={`/product/${item.id}`}
                key={item.id}
                className="flex items-center space-x-4 hover:bg-accent rounded-md p-2 transition-colors">
                <Image
                  width={100}
                  height={100}
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.quantity} x ${item.product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <Link href={`/order/${order.id}`}>
              <Button variant="outline">View Order Details</Button>
            </Link>
            <div className="space-x-2">
              {order.status === "unpaid" && order.paymentmethod === "card" && (
                <>
                  <Button variant="destructive">Delete Order</Button>
                  <Button>Pay Again</Button>
                </>
              )}
              {order.paymentmethod === "cash" ||
                (order.paymentmethod === "card" && order.status === "paid" && (
                  <Button>Leave a Review</Button>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersPageSection;
