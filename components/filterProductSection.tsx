"use client";

import React from 'react';
import { DataItem } from '@/data/types';
import { Button } from "@/components/ui/button";
import { HiShoppingCart } from "react-icons/hi";

interface FilteredProductsSectionProps {
  items: DataItem[];
  categoryName:string;
}

const FilteredProductsSection: React.FC<FilteredProductsSectionProps> = ({ items, categoryName }) => {
  return (
    <div className="container-fluid max-w-screen m-10 px-10">
      <div className="row">
        <h1 className="text-center text-[#5E3719] font-black text-2xl pb-5 pt-5">{categoryName}</h1>
        <Cart item={items} />
      </div>
    </div>
  );
};

const Cart: React.FC<{item : DataItem[]}>=({item}) => {
  return (
    <div className="container mx-auto p-4 place-items-center">
      <div className="mx-10 grid grid-cols-4 gap-4">
        {item.map((val) => (
          <div key={val.id} className="flex justify-center">
            <div className="card border border-gray-200 shadow-lg rounded-3xl" style={{ width: '80%', height: '350px' }}>
              <div className="card-img-top text-center mb-4">
                <img src={val.image} alt={val.name} className="w-full h-48 object-cover rounded-t-3xl" />
              </div>
              <div className="card-body">
                <div className='flex flex-col justify-evenly'>
                  <div className="card-title font-black">
                    <div className='flex justify-evenly text-base'>
                      <div className='text-black font-black pl-2'>{val.name}</div>
                      <div className='text-[#5E3719] font-black'>{val.price}/=</div>
                    </div>
                  </div>
                  <div className="card-text text-gray-500 flex justify-evenly">
                    <div>{val.qty} Available</div>
                    <div></div>
                  </div>
                  <div className='flex justify-evenly mt-4'>
                    <Button variant={"default"} size={"lg"} className="rounded-2xl px-12">
                      Buy Now
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className={
                        "text-[#5E3719] bg-gray-300 rounded-full text-xl flex items-center justify-center size-10 hover:text-[#5E3719] hover:bg-gray-400"
                      }>
                      <HiShoppingCart />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default FilteredProductsSection;
