import DashboardSales from "@/components/admin/dashboard-sales";
import { type ChartConfig } from "@/components/ui/chart";

import { getAllOrders } from "@/data/order";
import { getAllProductsForChart } from "@/data/product";
import { ProductsChart } from "@/components/admin/products-chart";
import OnlineOrdersDqashboard from "@/components/admin/online-orders-dashboard";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const Dashboard = async () => {
  const orders = await getAllOrders();
  const products = await getAllProductsForChart();

  return (
    <div className="w-full h-screen p-5 grid grid-rows-3 gap-y-5 overflow-hidden">
      <div className="flex items-start justify-center w-full rounded-lg bg-white">
        {/* <div className="w-2/3 p-5 rounded-lg bg-white">
          <OnlineOrdersDqashboard />
        </div> */}
        <DashboardSales />
      </div>
      <div className="w-full h-full grid grid-cols-2 gap-x-5 row-span-2">
        <div className="w-full rounded-lg bg-white p-5">
          <h1 className="text-lg font-bold mb-1">Products quantity</h1>
          <ProductsChart chartData={products} />
        </div>
        <div className="w-full rounded-lg bg-white p-5">
          <h1 className="text-lg font-bold mb-1">Products quantity</h1>
          <ProductsChart chartData={products} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
