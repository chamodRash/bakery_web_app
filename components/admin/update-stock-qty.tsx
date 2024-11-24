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
import { DataItem, stockProps } from "@/data/types";
import { Button } from "../ui/button";

interface UpdateStockQtyProps {
  children: React.ReactNode;
  stock: stockProps;
}
export const UpdateStockQty = ({ children, stock }: UpdateStockQtyProps) => {
  const { id, name, qty_unit } = stock;
  const [qty, setQty] = useState<number>(stock.qty as number);

  const onsubmit = async () => {
    // add the db logic to update the product quantity here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update the Quantity of {stock.name}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex items-center justify-center gap-x-10">
          {/* <Image
            src={image}
            alt={name}
            width={100}
            height={100}
            className="w-40 h-40 rounded-xl object-cover"
          /> */}
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-7">
            <div className="w-full flex flex-col items-start gap-1.5">
              <Label htmlFor="email">Quantity</Label>
              <Input
                type="number"
                id="name"
                placeholder="Quantity"
                className="w-full"
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value, 10))}
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
