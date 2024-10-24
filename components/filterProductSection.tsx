"use client";

import React, { useEffect, useState } from "react";
import { DataItem } from "@/data/types";
import { Button } from "@/components/ui/button";
import { HiShoppingCart } from "react-icons/hi";
import { ProductCard } from "./product-card";
import Link from "next/link";

interface FilteredProductsSectionProps {
  items: any[] | null;
  categoryName: string;
}

const FilteredProductsSection: React.FC<FilteredProductsSectionProps> = ({
  items,
  categoryName,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isMounted) {
    return (
      <div className="container-fluid max-w-screen m-10 px-10">
        <div className="row">
          <h1 className="text-center text-primary font-black text-2xl pb-5 pt-5">
            {categoryName}
          </h1>
          <div className="w-11/12 mx-auto py-4 place-items-center">
            <div className="flex flex-wrap gap-8 justify-center items-center">
              {items?.map((val, index) => (
                <ProductCard
                  key={val.id}
                  id={val.id}
                  slug={val.slug}
                  name={val.name}
                  price={val.price}
                  image={val.image}
                  qty={val.qty}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default FilteredProductsSection;
