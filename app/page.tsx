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
  const supabase = createClient();
  const [user, setUser] = useState<User | null>();
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSetItems = (items: DataItem[], categoryName: string) => {
    setFilteredItems(items);
    setCategoryName(categoryName);
  };
  const getSessionUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    data && setUser(data.user);
  }, []);

  const getSessionJWT = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const accessToken = session.access_token;
      console.log("JWT Token:", accessToken);
      console.log("Session", session);
    } else {
      console.log("User is not signed in");
    }
  }, []);

  useEffect(() => {
    getSessionUser();
  }, [getSessionUser]);

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
