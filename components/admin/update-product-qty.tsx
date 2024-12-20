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
import useCart from "@/hooks/use-cart";
import { DataItem } from "@/data/types";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { updateProductQuantity } from "@/data/product";
import React,{useEffect} from "react";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";


interface UpdateProductQtyProps {
  children: React.ReactNode;
  product: DataItem;
}
export const UpdateProductQty = ({ children, product }: UpdateProductQtyProps) => {
  const router = useRouter();
  const { id,image, name } = product;
  const [qty, setQty] = useState<number>(product.qty as number);
  const [loading, setLoading] = useState<boolean>(false);

  const onsubmit = async () => {
    if (qty < 0) {
      toast.error("Quantity cannot be negative.");
      return;
    }

    setLoading(true);
    try {
      await updateProductQuantity(id, qty);
      toast.success("Product quantity updated successfully!");
    } catch (error) {
      console.error("Failed to update product quantity:", error);
      toast.error("Failed to update product quantity. Please try again.");
    } finally {
      setLoading(false);
    }
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the Quantity of {product.name}</DialogTitle>
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
            <div className="w-full flex flex-col items-start gap-1.5">
              <Label htmlFor="quantity">Quantity ({qty})</Label>
              <Input
                type="number"
                id="name"
                placeholder="Quantity"
                className="w-full"
                value={qty}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  setQty(Math.max(0, Math.min(inputValue || 0)));
                }}
                disabled={loading}
              />
            </div>
            <DialogClose className="w-full flex items-center justify-center">
              <Button
                variant={"default"}
                className="w-full"
                onClick={() => {
                  onsubmit();
                }}>
                Update
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
