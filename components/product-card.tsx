import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

import { ShoppingCart } from "lucide-react";
import { CartModal } from "@/components/cart-modal";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number | string;
}
export const ProductCard = ({
  id,
  name,
  price,
  image,
  qty,
}: ProductCardProps) => {
  return (
    <Card className="w-[250px] h-[350px] rounded-3xl shadow-lg">
      <div className="w-full h-full grid grid-rows-[60%_40%]">
        <Link href={`/product?product=${id}`}>
          <Image
            className="w-full h-full bg-cover bg-center object-cover p-0 rounded-t-3xl"
            src={image}
            alt={name}
            width={400}
            height={300}
          />
        </Link>
        <div className="p-3 w-full h-full flex flex-col gap-y-3 justifiy-center my-auto">
          <Link href={`/product/${id}`}>
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-y-1">
                <CardTitle className="text-base font-bold text-zinc-700 leading-snug">
                  {name}
                </CardTitle>
                <CardDescription className="text-sm text-zinc-600 font-semibold">
                  {qty}
                </CardDescription>
              </div>
              <p className="text-lg font-bold text-primary">{`${
                price * 10
              }/=`}</p>
            </div>
          </Link>
          <div className="flex gap-x-4 items-center">
            <Button className="w-3/4 rounded-full text-white">Buy Now</Button>
            <CartModal productid={id} name={name} image={image} price={price}>
              <Button
                variant={"secondary"}
                size={"icon"}
                className="rounded-full">
                <ShoppingCart size={20} />
              </Button>
            </CartModal>
          </div>
        </div>
      </div>
    </Card>
  );
};
