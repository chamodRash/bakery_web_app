"use client";

import { DataItem } from "@/data/types";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { CartModal } from "./cart-modal";
import Link from "next/link";

interface ProductDetailsSectionProps {
  product: DataItem;
}

const ProductDetailsSection = ({ product }: ProductDetailsSectionProps) => {
  const [qty, setQty] = useState(1);

  return (
    <main className="container mx-auto py-10">
      <div className="w-10/12 mx-auto grid md:grid-cols-2 items-center justify-items-center gap-8">
        <div className="relative aspect-square">
          <Image
            width={600}
            height={600}
            src={product.image}
            alt={product.name}
            className="rounded-lg object-cover w-96 h-96"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          {product.qty === 0 ? (
            <p className="text-red-500">out of stock</p>
          ) : (
            <p>Available stock: {product.qty}</p>
          )}
          <p className="text-xl font-semibold mt-4 mb-4">
            Rs. {product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <Label htmlFor="qty">Quantity</Label>
            <Input
              type="number"
              id="qty"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              min={1}
              max={product.qty}
              className="w-16"
            />
          </div>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          <div className="w-full grid grid-cols-2 items-center justify-stretch gap-x-5">
            <CartModal product={product}>
              <Button
                variant={"outline"}
                className="rounded-lg"
                disabled={qty === 0}>
                Add to Cart
              </Button>
            </CartModal>
            <Button
              variant={"default"}
              className="rounded-lg"
              disabled={qty === 0}
              asChild>
              <Link href={`/checkout?slug=${product?.slug}&qty=${qty}`}>
                Buy Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsSection;
