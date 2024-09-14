"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Bun from "@/public/bun.jpg";
import { fetchProductDetails } from "@/actions/product";
import { addItemToCart } from "@/actions/cart";
import { useRouter } from "next/navigation";

export default function AddToCart({ productId }: { productId: any }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const router = useRouter();

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    setLoading(true);
    try {
      const product = await fetchProductDetails(1);
      if (!product) throw new Error("Product not found");

      const total = product.price * quantity;

      await addItemToCart({
        userid: "77cfe5b7-4d62-4b16-859b-a3769e874686",
        productid: product.id,
        quantity,
        total,
        status: true,
      });

      console.log("Item added to cart");
      setShowAlertDialog(true);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding item to cart:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setShowAlertDialog(false);
    window.location.href = "/addToCart";
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add To Cart</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>
              <div className="flex items-center">
                <Image src={Bun} width={200} height={500} alt="Dotted Bun" />
                <div className="ml-2 text-xl text-black">
                  <p className="font-semibold text-[20px]">Dotted Bun</p>
                  <br />
                  <p className="text-[18px]">Qty:</p>
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 py-1 border rounded-l bg-gray-200 hover:bg-gray-300">
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b bg-white">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="px-3 py-1 border rounded-r bg-gray-200 hover:bg-gray-300">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex justify-center mt-4">
              <Badge className="text-lg px-4 py-2">
                <button onClick={handleAddToCart} disabled={loading}>
                  {loading ? "Adding..." : "Add to Cart"}
                </button>
              </Badge>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showAlertDialog && (
        <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Item added to the cart successfully
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleContinue}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
