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

  console.log(cartItems);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const incrementItem = (index: number) => {};

  const decrementItem = (index: number) => {};

  const updateItem = (index: number, quantity: number) => {};

  const deleteItems = async (id: number) => {};

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Select</TableHead>
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
                <TableCell>
                  <Checkbox checked={item.status ? true : false} />
                </TableCell>
                <TableCell className="font-medium flex gap-x-3 items-center">
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt="Bun"
                    className="w-10 h-10 rounded-sm object-center object-cover"
                  />
                  <p>{item.name}</p>
                </TableCell>
                <TableCell className="text-center">{item.price}/=</TableCell>
                <TableCell className="flex items-center justify-center">
                  <div>
                    <button
                      onClick={() => decrementItem(index)}
                      className="p-2 border rounded">
                      -
                    </button>
                    <span className="px-2">{item.qty}</span>
                    <button
                      onClick={() => incrementItem(index)}
                      className="p-2 border rounded">
                      +
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {item.price * item.qty}/=
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button
                    variant={"destructive"}
                    size={"icon"}
                    onClick={() => deleteItems(item.id)}>
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
                <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
                  Total Amount
                </TableCell>
                <TableCell className="text-center">{totalAmount}/=</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
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
