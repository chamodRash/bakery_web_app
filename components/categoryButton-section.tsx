"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllCategory, getProductByCategory } from "@/data/product";
import { CategoryItem } from "@/data/types";
import { getAllProducts } from "@/data/product";
import { Button } from "./ui/button";

interface CategoryButtonSectionProps {
  setItems: (items: any[], categoryName: string) => void;
}

const CategoryButtonSection: React.FC<CategoryButtonSectionProps> = ({
  setItems,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>([]);

  const getCategory = useCallback(async () => {
    const res = await getAllCategory();
    setCategoryItems(res as CategoryItem[]);
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  const filterItems = async (id: number, name: string) => {
    const newItems = await getProductByCategory(id);
    const upperName = name.toLocaleUpperCase();
    setItems(newItems as any, upperName);
  };

  const handleGetAllProducts = async () => {
    const newItems = await getAllProducts();
    setItems(newItems as any, "ALL PRODUCTS");
  };
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + itemsPerPage < categoryItems.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <h1 className="uppercase text-center text-primary font-black text-2xl pb-5 pt-5">
        Categories
      </h1>
      <div className="flex justify-center items-center space-x-4">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={handlePrevClick}
          className="rounded-full">
          <ChevronLeft size={30} />
        </Button>
        <div className="flex space-x-4">
          {categoryItems
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map(({ id, name, img_url }) => (
              <button
                key={id}
                className="flex flex-col items-center"
                onClick={() => filterItems(id, name)}>
                <div
                  className="w-36 h-36 bg-cover bg-center rounded-full cursor-pointer"
                  style={{ backgroundImage: `url(${img_url})` }}>
                  <div className="relative w-full h-full backdrop-blur-[2px] rounded-full">
                    <div className="w-full h-full bg-black opacity-30 rounded-full"></div>
                    <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-lg drop-shadow-2xl">
                      {name}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          {currentIndex + itemsPerPage >= categoryItems.length && (
            <button
              className="flex flex-col items-center"
              onClick={handleGetAllProducts}>
              <div
                className="w-36 h-36 bg-cover bg-center rounded-full cursor-pointer"
                style={{ backgroundImage: `${logo}` }}>
                <div className="relative w-full h-full backdrop-blur-[2px] rounded-full">
                  <div className="w-full h-full bg-black opacity-30 rounded-full"></div>
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-lg drop-shadow-2xl">
                    All
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={handleNextClick}
          className="rounded-full">
          <ChevronRight size={30} />
        </Button>
      </div>
    </div>
  );
};

export default CategoryButtonSection;
