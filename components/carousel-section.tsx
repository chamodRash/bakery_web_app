"use client";

import React, { useEffect, useState, useCallback, ReactNode } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from "react-feather";
import { createClient } from "@/utils/supabase/client";
import { getSlides } from '@/data/carousel';
import { CarouselProps } from '@/data/types';

interface Slide {
  image: string;
}

const Carousel: React.FC<CarouselProps> = ({ children: slides, autoSlide = false, autoSlideInterval = 3000, slidesCount }) => {
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr === 0 ? slidesCount - 1 : curr - 1));
  const next = () => setCurr((curr) => (curr === slidesCount - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slidesCount]);

  return (
    <div className='relative overflow-hidden w-full h-full rounded-3xl '>
      <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides}
      </div>
      <div className='absolute inset-0 flex items-center justify-between p-3'>
        <button onClick={prev} className='p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white bg-opacity-50'>
          <ChevronLeft size={30} />
        </button>
        <button onClick={next} className='p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white bg-opacity-50'>
          <ChevronRight size={30} />
        </button>
      </div>
      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-2'>
          {slides.map((_, i) => (
            <div key={i} className={`transition-all w-2 h-2 bg-white rounded-full ${curr === i ? "p-1 w-4" : "bg-opacity-50 "}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CarouselSection: React.FC = () => {
  const supabase = createClient();
  const [slides, setSlides] = useState<Slide[]>([]);

  const getHomapageSlides = useCallback(async () => {
    const  slidesData = await getSlides();
    setSlides(slidesData as any);
    
  }, []);

  useEffect(() => {
    getHomapageSlides();
  }, [getSlides]);

  return (
    <div className="flex justify-center items-center max-h-96 max-w-screen m-10 px-10 rounded-3xl">
      <Carousel autoSlide={true} slidesCount={slides.length}>
        {slides.map((slide, index) => (
          <div className='min-w-full h-96 relative rounded-3xl' key={index}>
            <Image className="rounded-3xl object-fill" src={slide.image} layout="fill" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSection;
