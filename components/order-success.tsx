"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

interface orderItemsProps {
  id: number;
  productid: number;
  quantity: number;
  total: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

interface OrderSuccessProps {
  orders: orderItemsProps[];
}

const OrderSuccess = ({ orders }: OrderSuccessProps) => {
  const router = useRouter();
  const cart = useCart();
  const [isMounted, setIsMounted] = useState(false);

  const selectedCartItems = cart.items.filter(
    (item) => item.status === "checked"
  );
  selectedCartItems.map((item) => {
    cart.removeFromCart(item.id);
  });

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <div className="w-1/2 bg-white rounded-xl drop-shadow-lg py-10 flex flex-col items-center gap-y-5 my-10">
      <div className="text-center space-y-3 text-green-700">
        <h1 className="text-xl font-bold uppercase">
          Your Order has been placed successfully
        </h1>
        <p className="text-sm ">Thank you for ordering our product!</p>
      </div>
      <div className="w-2/3 mx-auto my-5 space-y-3">
        {orders.map((item) => (
          <div
            key={item.id}
            className="w-full h-20 bg-white border rounded-lg flex gap-x-3 items-center">
            <div className="rounded-l-lg w-20 h-20">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={100}
                height={100}
                className="w-20 h-20 rounded-l-lg object-cover"
              />
            </div>
            <div className="w-full h-full flex items-center justify-between px-5">
              <div>
                <h3 className="text-base">{item.product.name}</h3>
                <p className="text-sm">Rs. {item.product.price}.00</p>
              </div>
              <p className="text-sm">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="bg-green-500"
        onClick={() => {
          router.push("/");
        }}>
        Go to Home
      </Button>
    </div>
  );
};

export default OrderSuccess;
