"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { TrendingUp, ClipboardList, Tags, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

// Define timeframes for select dropdown
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

const DashboardSales = () => {
  const supabase = createClient();
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [salesData, setSalesData] = useState<any>({
    totalSales: 0,
    productsSold: 0,
    totalOrders: 0,
    newCustomers: 0,
  });

  useEffect(() => {
    // Helper function to convert local time to UTC
    const toUTC = (date: Date) => new Date(date.toISOString());

    // Function to fetch sales data
    const fetchSalesData = async () => {
      let fromDate: Date | null = null;
      let toDate: Date | null = new Date(); // End time defaults to now

      const today = new Date();

      // Set date ranges based on the selected timeframe
      switch (selectedTimeframe) {
        case "today":
          fromDate = new Date(today.setHours(0, 0, 0, 0)); // Start of today
          break;
        case "this_month":
          fromDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of this month
          break;
        case "last_month":
          fromDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Start of last month
          toDate = new Date(today.getFullYear(), today.getMonth(), 0); // End of last month
          break;
        case "3_months":
          fromDate = new Date(today.setMonth(today.getMonth() - 3)); // 3 months back
          break;
        case "6_months":
          fromDate = new Date(today.setMonth(today.getMonth() - 6)); // 6 months back
          break;
        case "this_year":
          fromDate = new Date(today.getFullYear(), 0, 1); // Start of this year
          break;
        case "last_year":
          fromDate = new Date(today.getFullYear() - 1, 0, 1); // Start of last year
          toDate = new Date(today.getFullYear() - 1, 11, 31); // End of last year
          break;
        case "all_time":
          fromDate = null; // No start time (query all data)
          toDate = null; // No end time
          break;
        default:
          break;
      }

      // Convert dates to UTC (if applicable)
      const fromDateUTC = fromDate ? toUTC(fromDate) : null;
      const toDateUTC = toDate ? toUTC(toDate) : null;

      // Supabase query with date range
      let query = supabase
        .from("order")
        .select("id, total, orderitem(id, quantity), userid")
        .gte("createdat", fromDateUTC?.toISOString())
        .lte("createdat", toDateUTC?.toISOString());

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching sales data:", error);
      } else {
        // Summarize sales data
        const totalSales = data.reduce(
          (acc: number, order: any) => acc + order.total,
          0
        );
        const totalOrders = data.length;
        const productsSold = data.reduce(
          (acc: number, order: any) =>
            acc +
            order.orderitem.reduce(
              (sum: number, item: any) => sum + item.quantity,
              0
            ),
          0
        );
        const newCustomers = new Set(data.map((order: any) => order.userid))
          .size;

        setSalesData({
          totalSales,
          productsSold,
          totalOrders,
          newCustomers,
        });
      }
    };

    fetchSalesData();
  }, [selectedTimeframe]);

  //   console.log(salesData);

  return (
    <div className="w-full h-full p-5">
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Sales</h1>
          <h4 className="text-sm font-light">Sales Summary</h4>
        </div>
        <Select
          defaultValue={selectedTimeframe}
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

      <div className="mt-3 grid grid-cols-4 items-center justify-center gap-x-5">
        <div className="h-20 w-full p-3 rounded-md flex gap-x-4 items-center bg-pink-100">
          <TrendingUp
            size={20}
            className="w-10 h-10 p-2.5 rounded-full text-white bg-pink-500"
          />
          <div>
            <h1 className="font-semibold">
              Rs. {salesData.totalSales.toLocaleString()}
            </h1>
            <h3 className="text-sm">Total Sales</h3>
          </div>
        </div>
        <div className="h-20 w-full p-3 rounded-md flex gap-x-4 items-center bg-emerald-100">
          <Tags
            size={20}
            className="w-10 h-10 p-2.5 rounded-full text-white bg-emerald-500"
          />
          <div>
            <h1 className="font-semibold">{salesData.productsSold}</h1>
            <h3 className="text-sm">Products Sold</h3>
          </div>
        </div>
        <div className="h-20 w-full p-3 rounded-md flex gap-x-4 items-center bg-amber-100">
          <ClipboardList
            size={20}
            className="w-10 h-10 p-2.5 rounded-full text-white bg-amber-500"
          />
          <div>
            <h1 className="font-semibold">{salesData.totalOrders}</h1>
            <h3 className="text-sm">Total Orders</h3>
          </div>
        </div>
        <div className="h-20 w-full p-3 rounded-md flex gap-x-4 items-center bg-purple-100">
          <UserPlus
            size={20}
            className="w-10 h-10 p-2.5 rounded-full text-white bg-purple-500"
          />
          <div>
            <h1 className="font-semibold">{salesData.newCustomers}</h1>
            <h3 className="text-sm">New Customers</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSales;
