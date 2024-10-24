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
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number | string;
}
export const ProductCard = ({
  id,
  slug,
  name,
  price,
  image,
  qty,
}: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${slug}`);
  };

  return (
    <Card
      onClick={handleClick}
      className="w-[250px] h-[350px] rounded-xl shadow-md">
      <CardHeader className="p-0 h-[60%]">
        <Image
          className="w-full h-full bg-cover bg-center object-cover p-0 rounded-t-xl"
          src={image}
          alt={name}
          width={400}
          height={300}
        />
      </CardHeader>
      <CardContent className="px-4 py-5">
        <div className="w-full flex items-center justify-between">
          <div className="w-2/3 flex flex-col gap-y-1">
            <CardTitle className="w-full text-base font-bold text-zinc-700 overflow-hidden whitespace-nowrap text-ellipsis">
              {name}
            </CardTitle>
            <CardDescription className="text-sm text-zinc-600 font-semibold">
              {qty}
            </CardDescription>
          </div>
          <p className="text-lg font-bold text-primary">{`${price}/=`}</p>
        </div>
      </CardContent>
      <CardFooter className="px-4 flex gap-x-4 items-center">
        <Button className="w-3/4 rounded-xl text-white" asChild>
          <Link href={`checkout?id=${id}`}>Buy Now</Link>
        </Button>
        <CartModal productid={id} name={name} image={image} price={price}>
          <Button variant={"secondary"} size={"icon"} className="rounded-lg">
            <ShoppingCart size={20} />
          </Button>
        </CartModal>
      </CardFooter>
    </Card>
  );
};
