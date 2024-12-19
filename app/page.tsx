"use server";

import React from "react";
import { createClient } from "@/utils/supabase/server";

import Navbar from "@/components/navbar";
import CarouselSection from "@/components/carousel-section";
import ProductsWithPagination from "@/components/ui/productPagination";
import { getAllCategory, getAllProducts } from "@/data/product";
import { getSlides } from "@/data/carousel";
import ProductsSection from "@/components/products-section";
import CategoryButtonSection from "@/components/categoryButton-section";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/footer";

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
    <div className="w-full pt-24">
      <Navbar user={loggedUser} />

      <CarouselSection carouselItems={carousel} />

      <CategoryButtonSection categoryItems={categories} />

      <ProductsWithPagination products={products} />

      <Footer />
    </div>
  );
}
