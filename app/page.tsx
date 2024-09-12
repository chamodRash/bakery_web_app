"use client";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import { getSessionUser } from "@/data/user";

import Navbar from "@/components/navbar";

//Chamindu Lakshan

import React, { useState, useEffect, useCallback } from "react";
import { User } from "@supabase/supabase-js";
import CarouselSection from "@/components/carousel-section";
import CategoryButtonSection from "@/components/categoryButton-section";
import CartSection from "@/components/cart-section";
import { DataItem } from "@/data/types";
import FilteredProductsSection from "@/components/filterProductSection";
//
export default function Home() {
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSetItems = (items: DataItem[], categoryName: string) => {
    setFilteredItems(items);
    setCategoryName(categoryName);
  };

  return (
    <div className="w-full">
      <Navbar />

      <CarouselSection />

      <CategoryButtonSection setItems={handleSetItems} />

      {filteredItems.length > 0 ? (
        <FilteredProductsSection
          items={filteredItems}
          categoryName={categoryName}
        />
      ) : (
        <CartSection />
      )}
    </div>
  );
}
