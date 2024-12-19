"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ChartsPageProps {}

const ChartsPageComponent = ({}: ChartsPageProps) => {
  const router = useRouter();
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <div className="w-full px-10 h-[90vh] overflow-y-hidden grid grid-cols-4 grid-rows-2 items-center justify-center gap-6">
      <div
        onClick={() => {
          router.push("/admin/charts?chart=products");
        }}
        className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Product Inventory</p>
        <p className="text-sm text-center text-zinc-700">
          Monitor product inventory to spot items needing restocking.
        </p>
      </div>
      <div
        onClick={() => {
          router.push("/admin/charts?chart=stock-levels");
        }}
        className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Stock Levels</p>

        <p className="text-sm text-center text-zinc-700">
          View the current stock quantity of all products.
        </p>
      </div>
      <div
        onClick={() => {
          router.push("/admin/charts?chart=trending-products");
        }}
        className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Trending Products</p>
        <p className="text-sm text-center text-zinc-700">
          Identify the most popular products for a selected time period.
        </p>
      </div>
      <div
        onClick={() => {
          router.push("/admin/charts?chart=sales-trends");
        }}
        className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Sales Trends</p>
        <p className="text-sm text-center text-zinc-700">
          Track daily, weekly, and monthly sales growth to identify peak
          periods.
        </p>
      </div>
      <div className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Revenue Vs Expenses</p>
        <p className="text-sm text-center text-zinc-700">
          Compare income and expenses over time to evaluate profitability.
        </p>
      </div>
      <div className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Feedback Sentiment</p>
        <p className="text-sm text-center text-zinc-700">
          Analyze customer feedback as positive, neutral, or negative.
        </p>
      </div>
      <div className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Discount Usage</p>
        <p className="text-sm text-center text-zinc-700">
          Discover the most used discounts and coupon codes.
        </p>
      </div>
      <div className="w-full h-56 p-5 rounded-lg bg-white drop-shadow-md flex flex-col items-center justify-center hover:scale-105 transition-all cursor-pointer">
        <p className="font-semibold text-zinc-900">Promotion Effectiveness</p>
        <p className="text-sm text-center text-zinc-700">
          Measure sales impact during promotional periods.
        </p>
      </div>
    </div>
  );
};

export default ChartsPageComponent;
