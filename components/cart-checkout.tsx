"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import CheckoutDetails from "@/components/checkout-details";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";

interface CartCheckoutProps {
  fullName: string;
  phone: string;
}

const CartCheckout = ({ fullName, phone }: CartCheckoutProps) => {
  const cart = useCart();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [productArray, setProductArray] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const selectedCartItems = cart.items.filter(
      (item) => item.status === "checked"
    );
    setCartItems(selectedCartItems);

    const productArray = selectedCartItems.map((item) => {
      const product = {
        id: item.id,
        slug: item.slug,
        name: item.name,
        categoryid: item.categoryid,
        price: item.price,
        image: item.image,
        description: item.description,
        status: item.status,
        categoryslug: item.categoryslug,
      };
      const qty = item.qty;
      return { product, qty }; // Properly return the object for each item
    });

    setProductArray(productArray); // Set the transformed array
  }, [cart.items]);

  return (
    <div className="min-h-screen h-fit w-11/12 mx-auto py-16">
      <h1 className="text-center text-xl font-bold uppercase mb-10">
        Checkout
      </h1>
      <div className="w-full grid grid-cols-3 gap-x-10">
        <div className="col-span-2">
          <Table>
            <TableCaption>
              {cartItems.length === 0
                ? "Your cart is currently empty. Start Shopping!"
                : ""}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="flex gap-x-3 items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="w-10 h-10 rounded-sm object-cover"
                    />
                    <p>{product.name}</p>
                  </TableCell>
                  <TableCell className="text-right">
                    Rs. {product.price}.00
                  </TableCell>
                  <TableCell className="text-center">
                    {Number(product.qty)}
                  </TableCell>
                  <TableCell className="text-right">
                    Rs. {product.price * Number(product.qty)}.00
                  </TableCell>
                </TableRow>
              ))}
              {cartItems.length > 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-right text-base font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold border-double border-b-2">
                    Rs.{" "}
                    {cartItems.reduce(
                      (total, item) => total + item.price * item.qty,
                      0
                    )}
                    .00
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <CheckoutDetails
          type={"cart"}
          items={productArray}
          name={fullName}
          phone={phone}
        />
      </div>
    </div>
  );
};

export default CartCheckout;
