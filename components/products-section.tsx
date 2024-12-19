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

interface ProductsSectionProps {
  items: DataItem[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ items }) => {
  const [isMount, setIsMount] = React.useState(false);

  React.useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <div className="w-10/12 mx-auto my-10">
      <div className="row">
        <h1 className="text-center text-primary font-black text-2xl pb-10 pt-5">
          PRODUCTS
        </h1>
        <Cart item={items} />
      </div>
    </div>
  );
};

const Cart: React.FC<CartProps> = ({ item }) => {
  return (
    <div className="w-full grid sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 gap-y-10 gap-x-10 justify-center items-center">
      {item.map((val, index) => (
        <ProductCard key={val.id} product={val} />
      ))}
    </div>
  );
};

export default ProductsSection;
