"use server";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/navbar";
import CarouselSection from "@/components/carousel-section";
import CategoryButtonSection from "@/components/categoryButton-section";
import CartSection from "@/components/products-section";
import FilteredProductsSection from "@/components/filterProductSection";

import { DataItem } from "@/data/types";
import { getAllCategory, getAllProducts } from "@/data/product";
import ProductsSection from "@/components/products-section";
import { getSlides } from "@/data/carousel";

export default async function Home() {
  const supabase = createClient();
  let loggedUser = true;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (user?.is_anonymous === true || user === null || error) {
    loggedUser = false;
  }
  const categories = await getAllCategory();
  const products = await getAllProducts();
  const carousel = await getSlides();

  return (
    <div className="pb-16 w-full bg-[#EEF5FF] pt-24">
      <Navbar user={loggedUser} />

      <CarouselSection carouselItems={carousel} />

      <CategoryButtonSection categoryItems={categories} />

      <ProductsSection items={products} />
    </div>
  );
}
