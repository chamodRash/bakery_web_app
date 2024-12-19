"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryItem } from "@/data/types";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CategoryButtonSectionProps {
  categoryItems: CategoryItem[];
}

const CategoryButtonSection: React.FC<CategoryButtonSectionProps> = ({
  categoryItems,
}) => {
  return (
    <div className="container mx-auto mb-10">
      <h1 className="uppercase text-center text-primary font-black text-2xl pb-10 pt-5">
        Categories
      </h1>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-10/12 mx-auto">
        <CarouselContent>
          {categoryItems.map((category, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/3 lg:basis-1/5 2xl:basis-1/7">
              <Link
                key={category.id}
                className="flex flex-col items-center"
                href={`/${category.slug}`}>
                <div
                  className="w-36 h-36 bg-cover bg-center rounded-full cursor-pointer"
                  style={{ backgroundImage: `url(${category.img_url})` }}>
                  <div className="relative w-full h-full backdrop-blur-[2px] rounded-full">
                    <div className="w-full h-full bg-black opacity-30 rounded-full"></div>
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-lg drop-shadow-2xl">
                      {category.name}
                    </p>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryButtonSection;
