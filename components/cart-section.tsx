"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Data from "@/actions/data";
import { Button } from "@/components/ui/button";
import { HiShoppingCart } from "react-icons/hi";
import { getAllProducts } from "@/data/product";
import { DataItem, CartProps } from "@/data/types";
import { ProductCard } from "./product-card";
import Link from "next/link";

const CartSection: React.FC = () => {
  const [items, setItems] = useState<DataItem[]>([]);

  const getProductsAll = useCallback(async () => {
    const productData = await getAllProducts();
    setItems(productData as any);
  }, []);

  useEffect(() => {
    getProductsAll();
  }, []);

  return (
    <div className="container-fluid max-w-screen m-10 px-10">
      <div className="row">
        <h1 className="text-center text-[#5E3719] font-black text-2xl pb-5 pt-5">
          PRODUCTS
        </h1>
        <Cart item={items} />
      </div>
    </div>
  );
};

const Cart: React.FC<CartProps> = ({ item }) => {
  return (
    <div className="container mx-auto p-4 place-items-center">
      <div className="flex flex-wrap gap-8 justify-center items-center">
        {item.map((val, index) => (
          <Link href={`/product/${val.id}`} key={index}>
            <ProductCard
              key={val.id}
              id={val.id}
              name={val.name}
              price={val.price}
              image={val.image}
              qty={val.qty}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CartSection;
