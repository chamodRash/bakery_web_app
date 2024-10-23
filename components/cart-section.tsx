"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "@/data/product";
import { DataItem, CartProps } from "@/data/types";
import { ProductCard } from "./product-card";

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
    <div className="w-full mx-auto">
      <div className="w-full flex flex-wrap gap-y-16 gap-x-10 justify-center items-center">
        {item.map((val, index) => (
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
  );
};

export default CartSection;
