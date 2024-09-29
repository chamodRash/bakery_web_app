"use client";

import React from "react";
import { DataItem } from "@/data/types";
import { Button } from "@/components/ui/button";
import { HiShoppingCart } from "react-icons/hi";
import { ProductCard } from "./product-card";
import Link from "next/link";

interface FilteredProductsSectionProps {
  items: DataItem[];
  categoryName: string;
}

const FilteredProductsSection: React.FC<FilteredProductsSectionProps> = ({
  items,
  categoryName,
}) => {
  return (
    <div className="container-fluid max-w-screen m-10 px-10">
      <div className="row">
        <h1 className="text-center text-[#5E3719] font-black text-2xl pb-5 pt-5">
          {categoryName}
        </h1>
        <Cart item={items} />
      </div>
    </div>
  );
};

const Cart: React.FC<{ item: DataItem[] }> = ({ item }) => {
  return (
    <div className="container mx-auto py-4 place-items-center">
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

export default FilteredProductsSection;
