"use client"; 

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataItem } from "@/data/types";  
import { getProductsBySearch } from "@/data/product";  
import { ProductCard } from "@/components/product-card";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";  
  const [products, setProducts] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductsBySearch(query);
        setProducts(res as any || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [query]);

  if (isLoading)
    return (
      <h2 className="text-center m-10 text-primary font-black text-2xl pb-5 pt-5">
        Loading....
      </h2>
    );

  if (products.length === 0)
    return (
      <h2 className="text-center m-10 text-primary font-black text-2xl pb-5 pt-5">
        No products found...
      </h2>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
