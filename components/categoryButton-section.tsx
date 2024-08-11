"use client";

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/public/logo.png';
import { ChevronLeft, ChevronRight } from "react-feather";
import { getAllCategory, getProductByCategory } from '@/data/product';
import { CategoryItem } from '@/data/types';
import { getAllProducts } from '@/data/product';

interface CategoryButtonSectionProps {
  setItems: (items: any[], categoryName:string) => void;
}

const CategoryButtonSection: React.FC<CategoryButtonSectionProps> = ({ setItems }) => {
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

   const filterItems = async (id: number , name:string) => {
    const newItems = await getProductByCategory(id);
    const upperName = name.toLocaleUpperCase();
    setItems(newItems as any , upperName);
  };

  const handleGetAllProducts = async () => {
    const newItems = await getAllProducts();
    setItems(newItems as any , "ALL PRODUCTS");
  }
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
    <div className="container-fluid max-w-screen m-10 px-10">
      <div className="row">
        <h1 className="text-center text-[#5E3719] font-black pb-7 text-2xl">CATEGORIES</h1>
        <div className='flex justify-center items-center space-x-4'>
          <button onClick={handlePrevClick} className='p-1 rounded-full shadow bg-gray text-gray-800 hover:bg-white bg-opacity-50'>
            <ChevronLeft size={30} />
          </button>
          <div className='flex space-x-4'>
            {categoryItems.slice(currentIndex, currentIndex + itemsPerPage).map(({ id , name , img_url }) => (
              <button
                key={id}
                className='flex flex-col items-center'
                onClick={() => filterItems(id , name)}
              >
                <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300'>
                  <Image src={img_url} width={96} height={96} alt={name} className='object-cover' />
                </div>
                <p className='mt-2 text-center font-semibold'>{name}</p>
              </button>
            ))}
            {currentIndex + itemsPerPage >= categoryItems.length && (
          <button className='flex flex-col items-center' onClick={handleGetAllProducts}>
            <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300'>
              <Image src={logo} width={96} height={96} alt="All" className='object-cover' />
            </div>
            <p className='mt-2 text-center font-semibold'>All</p>
          </button>
            )} 
          </div>
          <button onClick={handleNextClick} className='p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white bg-opacity-50'>
            <ChevronRight size={30} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryButtonSection;
