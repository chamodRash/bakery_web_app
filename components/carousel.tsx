"use client";
import React, { useEffect, useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  children: ReactNode[];
  autoSlide?: boolean;
  autoSlideInterval?: number;
  slidesCount: number;
}

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 3000,
  slidesCount,
}: CarouselProps) {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slidesCount - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === slidesCount - 1 ? 0 : curr + 1));

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, slidesCount]);

  return (
    <div className="relative overflow-hidden w-full h-full rounded-3xl ">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides}
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-3">
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white bg-opacity-50">
          <ChevronLeft size={30} />
        </Button>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={next}
          className="p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white bg-opacity-50">
          <ChevronRight size={30} />
        </Button>
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`transition-all w-2 h-2 bg-white rounded-full ${
                curr === i ? "p-1 w-4" : "bg-opacity-50 "
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
