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
import { BuyNowModal } from "./buy-now-modal";
import { useRouter } from "next/navigation";
import { DataItem } from "@/data/types";

interface ProductCardProps {
  product: DataItem;
}
export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, image, price, qty, slug } = product;
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <Card className="w-[250px] h-[350px] rounded-xl shadow-md">
      <CardHeader
        className="p-0 h-[60%] cursor-pointer"
        onClick={handleCardClick}>
        <Image
          className="w-full h-full bg-cover bg-center object-cover p-0 rounded-t-xl"
          src={image}
          alt={name}
          width={400}
          height={300}
        />
      </CardHeader>
      <CardContent
        className="px-4 py-5 cursor-pointer"
        onClick={handleCardClick}>
        <div className="w-full flex items-center justify-between">
          <div className="w-2/3 flex flex-col gap-y-1">
            <CardTitle className="w-full text-base font-bold text-zinc-700 overflow-hidden whitespace-nowrap text-ellipsis">
              {name}
            </CardTitle>
            {qty === 0 ? (
              <CardDescription className="text-sm text-zinc-600 font-semibold">
                <p className="text-red-500">out of stock</p>
              </CardDescription>
            ) : (
              <CardDescription className="text-sm text-zinc-600 font-semibold">
                {qty}
              </CardDescription>
            )}
          </div>
          <p className="text-lg font-bold text-primary">{`${price}/=`}</p>
        </div>
      </CardContent>
      <CardFooter className="px-4 flex gap-x-4 items-center">
        <BuyNowModal
          productid={id}
          productSlug={slug}
          name={name}
          productqty={qty}
          image={image}
          price={price}
          asChild>
          <Button className="w-3/4 rounded-xl text-white" disabled={qty === 0}>
            Buy Now
          </Button>
        </BuyNowModal>
        <CartModal product={product}>
          <Button
            variant={"secondary"}
            size={"icon"}
            className="rounded-lg"
            disabled={qty === 0}>
            <ShoppingCart size={20} />
          </Button>
        </CartModal>
      </CardFooter>
    </Card>
  );
};
