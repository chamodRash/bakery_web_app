"use client";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

import { getSessionUser } from "@/data/user";

import Navbar from "@/components/navbar";

//Chamindu Lakshan
import Carousel from "@/components/carousel";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Data from "@/actions/data";
import CategoryButton from "@/components/categoryButton";
import Card from "@/components/card";
import { User } from "@supabase/supabase-js";
import { getSlides } from "@/data/carousel";



interface DataItem {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  desc: string;
  available: string | number;
}
//
export default function Home() {
  const supabase = createClient();
  const [items, setItems] = useState<DataItem[]>([]);
  const [user, setUser] = useState<User | null>()
  const [slides , setSlides] = useState<any[]>([]);
  
  
  const getSessionUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    data && setUser(data.user);
  }, [])

  const getHomapageSlides = useCallback(async () => {
    const  slidesData = await getSlides();
    setSlides(slidesData as any);
    
  }, []);

  useEffect(() => {
    setItems(Data);
    getSessionUser();
    getHomapageSlides();
  }, [getSessionUser, getHomapageSlides]);

  const categoryItems = Array.from(new Set(Data.map(item => item.category))).map(category => {
    const firstImage = Data.find(item => item.category === category)?.image || '';
    return { category, image: firstImage };
  });

  const filterItems = (cat: string) => {
    const newItems = Data.filter((newval) => newval.category === cat);
    setItems(newItems);
  };

  

  return (
    <div className="w-full">
      <Navbar user={user} />


      <div className="flex justify-center items-center max-h-96 max-w-screen m-10 px-10 rounded-3xl">
      <Carousel autoSlide={true} slidesCount={slides.length}>
        {slides.map((src, index) => ( 
          <div className='min-w-full h-96 relative rounded-3xl' key={index}>
            <Image className="rounded-3xl object-fill" src={src?.image} layout="fill" alt={`Slide ${index + 1}`} />
            <hr />
          </div>
        ))}
      </Carousel>
      </div>

      <div className="container-fluid max-w-screen m-10 px-10">
        <div className="row">
          <h1 className="text-center text-[#5E3719] font-black pb-5">CATEGORIES</h1>
          <CategoryButton
            categoryItems={categoryItems}
            filterItems={filterItems}
            setItems={setItems}
          />
        </div>
      </div>~

      <div className="container-fluid max-w-screen m-10 px-10">
        <div className="row">
          <h1 className="text-center text-[#5E3719] font-black">PRODUCT</h1>
          <Card item={items} />
        </div>
      </div>
    </div>

  );
}
