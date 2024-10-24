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
    <div className="w-10/12 mx-auto grid grid-cols-2 gap-x-5 mb-16">
      <Image
        width={600}
        height={600}
        src={product?.image}
        alt={product?.name}
        className="w-96 h-96 rounded-3xl object-cover justify-self-center"
      />
      <div className="relative space-y-5 py-5 pr-5 flex flex-col">
        <div className="flex flex-col gap-y-3 w-full">
          <h1 className="text-2xl font-bold">{product?.name}</h1>
          <p className="text-justify indent-10 text-gray-700">
            {product?.description}
          </p>
        </div>
        <div className="w-full absolute bottom-5 left-0 flex flex-col gap-y-8">
          <div className="w-full flex items-center justify-between px-10">
            <div>
              <Label htmlFor="qtySec" className="mb-5">
                Quantity:
              </Label>
              <div className="flex items-center" id="qtySec">
                <Button
                  onClick={() => setQty(qty - 1)}
                  variant={"secondary"}
                  size={"icon"}
                  className="rounded-r-none border border-zinc-300">
                  <Minus size={13} />
                </Button>
                <Input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-16 text-center remove-arrow rounded-none border border-zinc-300"
                />
                <Button
                  onClick={() => setQty(qty + 1)}
                  variant={"secondary"}
                  size={"icon"}
                  className="rounded-l-none border border-zinc-300">
                  <Plus size={13} />
                </Button>
              </div>
            </div>
            <p className="font-bold text-xl text-primary text-right">
              Rs. {product?.price}/=
            </p>
          </div>
          <div className="w-full grid grid-cols-2 items-center justify-stretch gap-x-5">
            <CartModal
              productid={product?.id}
              name={product?.name}
              image={product?.image}
              price={product?.price}>
              <Button variant={"outline"} className="rounded-full">
                Add to Cart
              </Button>
            </CartModal>
            <Button variant={"default"} className="rounded-full" asChild>
              <Link href={`/checkout?slug=${product?.slug}&qty=${qty}`}>
                Buy Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSection;
