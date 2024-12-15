"use client";

import Image from "next/image";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
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
import { updateStockQuantity } from "@/data/stock";
import { useRouter } from "next/navigation";

interface UpdateStockQtyProps {
  children: React.ReactNode;
  stock: stockProps;
}
export const UpdateStockQty = ({ children, stock }: UpdateStockQtyProps) => {
  const router = useRouter();
  const { id, name, qty_unit } = stock;
  const [qty, setQty] = useState<number>(stock.qty as number);
  const [loading, setLoading] = useState<boolean>(false);

  const onsubmit = async () => {
    if (qty < 0) {
      toast.error("Quantity cannot be negative.");
      return;
    }

    setLoading(true);
    try {
      await updateStockQuantity(id, qty);
      toast.success("Stock quantity updated successfully!");
    } catch (error) {
      console.error("Failed to update stock quantity:", error);
      toast.error("Failed to update stock quantity. Please try again.");
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
          <DialogTitle>Update the Quantity of {name}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex items-center justify-center gap-x-10">
          <div className="w-full h-full flex flex-col items-center justify-center gap-y-7">
            {/* Quantity Input */}
            <div className="w-full flex flex-col items-start gap-1.5">
              <Label htmlFor="quantity">Quantity ({qty_unit})</Label>
              <Input
                type="number"
                id="quantity"
                placeholder="Enter quantity"
                className="w-full"
                value={qty}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  setQty(Math.max(0, Math.min(inputValue || 0)));
                }}
                disabled={loading}
              />
            </div>

            <DialogFooter>
              <DialogClose className="w-full">
                <Button
                  variant={"default"}
                  className="w-full"
                  onClick={onsubmit}
                  disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
