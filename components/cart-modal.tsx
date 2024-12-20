"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "./ui/button";
import { addToCart } from "@/actions/add-to-cart";
import { toast } from "react-hot-toast";
import useCart from "@/hooks/use-cart";
import { DataItem } from "@/data/types";

interface CartModalProps {
  children: React.ReactNode;
  product: DataItem;
}
export const CartModal = ({ children, product }: CartModalProps) => {
  const { name, image } = product;
  const [qty, setQty] = useState(1);
  const cart = useCart();

  if (qty < 1 || qty > product.qty) {
    qty < 1 && setQty(qty + 1);
    qty > 1 && setQty(qty - 1);
  }

  const onsubmit = async () => {
    cart.addToCart(product, qty);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Cart</DialogTitle>
        </DialogHeader>
        <div className="w-full flex items-center justify-between gap-x-10">
          <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="w-40 h-40 rounded-xl object-cover"
          />
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-7">
            <div className="w-fit flex flex-col items-start gap-1.5">
              <Label htmlFor="email">Add the Quantity</Label>
              <div className="w-full flex gap-x-3 items-center">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => setQty(qty - 1)}>
                  -
                </Button>
                <Input
                  type="number"
                  id="name"
                  placeholder="Quantity"
                  className={`w-1/2`}
                  value={qty}
                  min={1}
                  max={product.qty}
                  onChange={(e) => setQty(parseInt(e.target.value, 10))}
                />
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => setQty(qty + 1)}>
                  +
                </Button>
              </div>
            </div>
            <DialogClose className="w-full flex items-center justify-center">
              <Button
                variant={"outline"}
                className="w-full rounded-full border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => {
                  onsubmit();
                }}>
                Add to Cart
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
