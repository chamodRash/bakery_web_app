import React, { useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Data from "@/actions/data";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Button } from "./ui/button";

interface CategoryItem {
  category: string;
  image: string;
}

interface CategoryButtonProps {
  categoryItems: CategoryItem[];
  filterItems: (category: string) => void;
  setItems: (items: typeof Data) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  categoryItems,
  filterItems,
  setItems,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + itemsPerPage < categoryItems.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  return (
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
          .map(({ category, image }) => (
            <button
              key={category}
              className="flex flex-col items-center"
              onClick={() => filterItems(category)}>
              <div
                className="w-36 h-36 bg-cover bg-center rounded-full cursor-pointer"
                style={{ backgroundImage: `url(${image})` }}>
                <div className="relative w-full h-full backdrop-blur-[2px] rounded-full">
                  <div className="w-full h-full bg-black opacity-30 rounded-full"></div>
                  <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-lg drop-shadow-2xl">
                    {category}
                  </p>
                </div>
              </div>
            </button>
          ))}
        {currentIndex + itemsPerPage >= categoryItems.length && (
          <button
            className="flex flex-col items-center"
            onClick={() => setItems(Data)}>
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
  );
};

export default CategoryButton;
