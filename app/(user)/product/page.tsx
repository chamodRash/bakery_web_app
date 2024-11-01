"use server";

import React from "react";
import { createClient } from "@/utils/supabase/server";

import CategoryButtonSection from "@/components/categoryButton-section";

import { getAllCategory, getAllProducts } from "@/data/product";
import ProductsSection from "@/components/products-section";

export default async function Home() {
  const supabase = createClient();
  const categories = await getAllCategory();
  const products = await getAllProducts();

  return (
    <div className="pb-16 w-full bg-[#EEF5FF] pt-24">
      <CategoryButtonSection categoryItems={categories} />
      <ProductsSection items={products} />
    </div>
  );
}
