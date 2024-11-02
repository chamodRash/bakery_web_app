"use client";

import React, { useEffect, useState } from "react";
import { fetchCartItems, getCart } from "@/actions/cart";
import Image from "next/image";
import Link from "next/link";

import { Minus, Plus, Trash2 } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import useCart from "@/hooks/use-cart";

interface CartItem {
  id: number;
  productid: number;
  quantity: number;
  total: number;
  status: boolean;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

const CartPage = () => {
  const [cartItems, setCartItems] = React.useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const cart = useCart();

  useEffect(() => {
    setCartItems(cart.items);
  }, [cart.items]);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const onCheckItem = (id: number, status: string) => {
    cart.checkItem(id, status);
  };

  const incrementItem = (id: number) => {
    cart.incrementItem(id);
  };

  const decrementItem = (id: number) => {
    cart.decrementItem(id);
  };

  const deleteItems = (id: number) => {
    cart.removeFromCart(id);
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (item.status === "checked" ? item.price * item.qty : 0),
    0
  );

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <h1 className="text-center text-primary uppercase font-black text-2xl py-10">
        My Cart
      </h1>

      <div className="w-11/12 mx-auto">
        {cartItems.length === 0 ? (
          <p className="text-center text-lg">
            Your cart is currently empty. Start Shopping!
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20 text-center px-0">Select</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="w-28 pl-0 relative">
                    <Checkbox
                      onCheckedChange={() => onCheckItem(item.id, item.status)}
                      checked={item.status === "checked" ? true : false}
                      className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </TableCell>
                  <TableCell className="font-medium flex gap-x-3 items-center">
                    <Image
                      src={item.image}
                      width={100}
                      height={100}
                      alt="Bun"
                      className="w-14 h-14 rounded-sm object-center object-cover"
                    />
                    <p>{item.name}</p>
                  </TableCell>
                  <TableCell className="text-right">{item.price}/=</TableCell>
                  <TableCell className="relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center border border-gray-300 rounded-md">
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => decrementItem(item.id)}
                        className="p-2 bg-transparent rounded-r-none">
                        -
                      </Button>
                      <span className="px-4 py-2 border-x border-gray-300">
                        {item.qty}
                      </span>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        onClick={() => incrementItem(item.id)}
                        className="p-2 bg-transparent rounded-l-none">
                        +
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.price * item.qty}/=
                  </TableCell>
                  <TableCell className="relative">
                    <Button
                      variant={"destructive"}
                      size={"icon"}
                      onClick={() => deleteItems(item.id)}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Trash2 size={20} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            {cartItems.length !== 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell
                    style={{ textAlign: "center", fontWeight: "bold" }}>
                    Total Amount
                  </TableCell>
                  <TableCell className="text-center">{totalAmount}/=</TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        )}
      </div>

      {cartItems.length !== 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="default" className="w-52">
            <Link href="/checkout?type=cart">Checkout</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
export default CartPage;
