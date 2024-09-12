import React from "react";
import Image from "next/image";
import { HiOutlineX, HiShoppingCart } from "react-icons/hi";
import { Button } from "../ui/button";
import Link from "next/link";

interface Product {
  id: number;
  image: string;
  name: string;
  categoryid: number;
  categoryName?: string;
  price: string;
  description: string;
  category: string;
  qty: number;
}

interface CategoryModalProps {
  category: string | null;
  isOpen: boolean;
  onClose: () => void;
  categoryProducts: Product[];
  handleProductClick: (product: Product) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  isOpen,
  onClose,
  categoryProducts,
  handleProductClick,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black bg-opacity-75 overflow-auto touch-pan-y">
      <div className="bg-white max-w-screen-xl h-screen rounded-lg justify-center p-4 touch-pan-y overflow-auto">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="bg-white text-[#5E3719] text-xl absolute top-4 right-4"
          onClick={onClose}
        >
          <HiOutlineX />
        </Button>
        <h2 className="text-3xl text-center text-[#5E3719] font-bold mb-8">
          {category}
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {categoryProducts.map((product) => (
            <div
              key={product.id}
              className="text-center rounded-3xl bg-[hsl(5,12%,83%)] shadow-lg shadow-[#5E3719] max-w-xs"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                priority={true}
                className="w-[400px] h-[300px] object-cover  rounded-3xl cursor-pointer"
                onClick={() => handleProductClick(product)}
              />
              <div className="pr-4 pl-4">
                <div className="mt-2 font-bold flex justify-between">
                  <p onClick={() => handleProductClick(product)} className="hover:text-[#5E3719]">{product.name}</p>
                  <p>Rs. {product.price}/=</p>
                </div>
                <p className="mb-2 text-left font-light">{product.categoryName}</p>
              </div>
              <div className="pr-4 pl-4 mb-5 flex justify-between">
                <Link href={`/buy/${product.id}`} className="flex w-5/6">
                  <Button className="rounded-full w-5/6">Buy Now</Button>
                </Link>
                <Link href={`/cart/${product.id}`}>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    className="text-[#5E3719] hover:bg-white hover:text-[#5E3719] text-2xl rounded-full"
                  >
                    <HiShoppingCart />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
