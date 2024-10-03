"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

import Navbar from "@/components/navbar";
import CarouselSection from "@/components/carousel-section";
import CategoryButtonSection from "@/components/categoryButton-section";
import CartSection from "@/components/cart-section";
import FilteredProductsSection from "@/components/filterProductSection";

import { DataItem } from "@/data/types";

export default function Home() {
  const supabase = createClient();
  const [loggedUser, setLoggedUser] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSetItems = (items: DataItem[], categoryName: string) => {
    setFilteredItems(items);
    setCategoryName(categoryName);
  };

  const getDbUser = useCallback(async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user?.is_anonymous === true || user === null || error) {
      setLoggedUser(false);
      return;
    }
    setLoggedUser(true);
  }, [supabase]);

  useEffect(() => {
    getDbUser();
  }, [getDbUser, loggedUser]);

  return (
    <div className="pb-16 w-full bg-[#EEF5FF] pt-24">
      <Navbar user={loggedUser} />

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
