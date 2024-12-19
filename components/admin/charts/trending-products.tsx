"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { getTrendingProducts } from "@/data/order";

const timeframes = [
  { label: "Today", value: "today" },
  { label: "This Month", value: "this_month" },
  { label: "Last Month", value: "last_month" },
  { label: "Last 3 Months", value: "3_months" },
  { label: "Last 6 Months", value: "6_months" },
  { label: "This Year", value: "this_year" },
  { label: "Last Year", value: "last_year" },
  { label: "All Time", value: "all_time" },
];

interface TrendingProduct {
  productid: string;
  product: {
    id: number;
    name: string;
  };
  quantity: number;
}
interface TrendingProductsProps {
  name: string;
  quantity: number;
}

const chartConfig = {
  stock: {
    label: "quantity",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function TrendingProductsChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [trendingProducts, setTrendingProducts] = useState<
    TrendingProductsProps[]
  >([]);

  useEffect(() => {
    const toUTC = (date: Date) => new Date(date.toISOString());
    const fetchTrendingProducts = async () => {
      let fromDate: Date | null = null;
      let toDate: Date | null = new Date();

      const today = new Date();
      switch (selectedTimeframe) {
        case "today":
          fromDate = new Date(today.setHours(0, 0, 0, 0));
          break;
        case "this_month":
          fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        case "last_month":
          fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          toDate = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
        case "3_months":
          fromDate = new Date(today.setMonth(today.getMonth() - 3));
          break;
        case "6_months":
          fromDate = new Date(today.setMonth(today.getMonth() - 6));
          break;
        case "this_year":
          fromDate = new Date(today.getFullYear(), 0, 1);
          break;
        case "last_year":
          fromDate = new Date(today.getFullYear() - 1, 0, 1);
          toDate = new Date(today.getFullYear() - 1, 11, 31);
          break;
        case "all_time":
          fromDate = null;
          toDate = null;
          break;
      }

      const fromDateUTC = fromDate ? toUTC(fromDate) : null;
      const toDateUTC = toDate ? toUTC(toDate) : null;

      let fetchedTrendingProducts = (await getTrendingProducts({
        from: fromDateUTC?.toISOString(),
        to: toDateUTC?.toISOString(),
      })) as TrendingProduct[];
      console.log(fetchedTrendingProducts);

      // Format the data if necessary
      const formattedProducts = fetchedTrendingProducts.map((product) => ({
        name: product.product.name,
        quantity: product.quantity,
      }));

      setTrendingProducts(formattedProducts);
    };

    fetchTrendingProducts();
  }, [selectedTimeframe]);

  return (
    <div className="w-full h-[90vh] px-10 py-5 bg-white rounded-l-xl">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/charts">Charts</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Trending Products Chart</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-full mt-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Trending Products Chart</h1>
          <h4 className="text-sm font-light">
            Identify the most popular products for a selected time period.
          </h4>
        </div>
        <Select
          value={selectedTimeframe}
          onValueChange={(value) => setSelectedTimeframe(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            {timeframes.map((timeframe) => (
              <SelectItem key={timeframe.value} value={timeframe.value}>
                {timeframe.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-2/3 mt-5 mx-auto max-h-96">
        <ChartContainer config={chartConfig} className="">
          <BarChart accessibilityLayer data={trendingProducts}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              dataKey="quantity"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="quantity" fill="#2563eb" radius={6} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
