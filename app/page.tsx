"use client";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

import Navbar from "@/components/navbar";
import LogoutBtn from "@/components/auth/logout-btn";
import { Button } from "@/components/ui/button";
import { getVerificationTokenByToken } from "@/data/token";

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
  const [filteredItems , setFilteredItems] = useState<DataItem[]>([]);
  const [categoryName , setCategoryName] = useState<string>("");

  const handleSetItems = (items:DataItem[] , categoryName:string)=>{
    setFilteredItems(items);
    setCategoryName(categoryName);
  }
  const getSessionUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    data && setUser(data.user);
  }, [])


  useEffect(() => {
    getSessionUser();
  }, [getSessionUser]);

  return (
    <div className="w-full">
      <Navbar user={user} />
      
       <CarouselSection/>

      <CategoryButtonSection setItems={handleSetItems} />

      {filteredItems.length > 0 ? (
        <FilteredProductsSection items={filteredItems} categoryName = {categoryName} />
      ) : (
        <CartSection />
      )}
    </div>
  );}