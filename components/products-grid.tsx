"use client";

import React from "react";
import { ProductCard } from "./product-card";
import Link from "next/link";
import { DataItem } from "@/data/types";

interface CardProps {
  item: DataItem[];
}

const ProductsGrid: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="container mx-auto p-4 place-items-center">
      <div className="mx-10 grid grid-cols-4 gap-4">
        {item.map((val, index) => (
          <Link href={`/product?id=${val.id}`} key={index}>
            <ProductCard key={index} product={val} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
