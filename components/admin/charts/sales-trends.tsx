"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { getAllOrdersByDateRange } from "@/data/order";

const chartConfig = {
  count: {
    label: "Sales Count",
  },
  online: {
    label: "Online",
    color: "hsl(var(--chart-1))",
  },
  pos: {
    label: "POS",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

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

interface OrderType {
  id: number;
  total: number;
  order_type: string;
  createdat: string;
}
interface OrderChartType {
  date: string;
  online: number;
  pos: number;
}

export function SalesTrendsChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("online");

  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [tendingSales, setTendingSales] = useState<OrderChartType[]>([]);
  const [total, setTotal] = useState({ online: 0, pos: 0 });

  function transformOrderData(orders: OrderType[]): OrderChartType[] {
    // Use a Map to group by date and accumulate the online/pos counts
    const groupedData: Map<string, { online: number; pos: number }> = new Map();

    orders.forEach((order) => {
      // Extract the date part from createdat (e.g., "2024-12-16")
      const date = new Date(order.createdat).toISOString().split("T")[0];

      // Initialize the date group if not already present
      if (!groupedData.has(date)) {
        groupedData.set(date, { online: 0, pos: 0 });
      }

      // Increment the appropriate count (online or pos)
      const group = groupedData.get(date)!;
      if (order.order_type === "online") {
        group.online += 1;
      } else if (order.order_type === "pos") {
        group.pos += 1;
      }
    });

    // Convert the grouped data into the desired array format
    return Array.from(groupedData.entries()).map(([date, counts]) => ({
      date,
      online: counts.online,
      pos: counts.pos,
    }));
  }

  useEffect(() => {
    const toUTC = (date: Date) => new Date(date.toISOString());
    const fetchTendingSales = async () => {
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
          fromDate = new Date("2000-01-01");
          toDate = new Date();
          break;
      }

      const fromDateUTC = fromDate ? toUTC(fromDate) : null;
      const toDateUTC = toDate ? toUTC(toDate) : null;

      let fetchedSalesData = (await getAllOrdersByDateRange({
        from: fromDateUTC?.toISOString(),
        to: toDateUTC?.toISOString(),
      })) as OrderType[];

      setTotal({
        online: fetchedSalesData
          .filter((order) => order.order_type === "online")
          .reduce((acc, order) => acc + order.total, 0),
        pos: fetchedSalesData
          .filter((order) => order.order_type === "pos")
          .reduce((acc, order) => acc + order.total, 0),
      });

      console.log(total);

      const resultArray = transformOrderData(fetchedSalesData);

      setTendingSales(resultArray);
    };

    fetchTendingSales();
  }, [selectedTimeframe]);

  return (
    <div className="w-full">
      <Breadcrumb className="my-5 ml-10">
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
      <div className="w-11/12 mx-auto mt-5 flex items-center justify-between">
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
      <Card className="w-11/12 mx-auto mt-10">
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Line Chart - Interactive</CardTitle>
            <CardDescription>
              Showing total visitors for the last 3 months
            </CardDescription>
          </div>
          <div className="flex">
            {["online", "pos"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}>
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    {total[key as keyof typeof total].toLocaleString()}/-
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full">
            <LineChart
              accessibilityLayer
              data={tendingSales}
              margin={{
                left: 12,
                right: 12,
              }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="count"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Line
                dataKey={activeChart}
                type="monotone"
                stroke={`var(--color-${activeChart})`}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
