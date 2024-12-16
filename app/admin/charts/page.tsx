"use server";

import ChartsPageComponent from "@/components/admin/charts/chart-page";
import { ProductsInventory } from "@/components/admin/charts/products-inventory";
import { SalesTrendsChart } from "@/components/admin/charts/sales-trends";
import { StockLevelsChart } from "@/components/admin/charts/stock-levels";
import { TrendingProductsChart } from "@/components/admin/charts/trending-products";
import { getTrendingProducts } from "@/data/order";
import { getAllProducts } from "@/data/product";
import { getStock } from "@/data/stock";

interface ChartsPageProps {
  searchParams: {
    chart: string;
  };
}

const ChartsPage = async ({ searchParams }: ChartsPageProps) => {
  const products = await getAllProducts();
  const stock = await getStock();

  return (
    <div className="w-full bg-secondary">
      <div className="w-full px-10 py-3 flex items-center bg-secondary">
        <h3 className="font-bold text-lg text-zinc-700">Charts and Reports</h3>
      </div>
      {!searchParams.chart && <ChartsPageComponent />}
      {searchParams && searchParams.chart === "products" && (
        <ProductsInventory chartData={products} />
      )}
      {searchParams && searchParams.chart === "stock-levels" && (
        <StockLevelsChart chartData={stock} />
      )}
      {searchParams && searchParams.chart === "trending-products" && (
        <TrendingProductsChart />
      )}
      {searchParams && searchParams.chart === "sales-trends" && (
        <SalesTrendsChart />
      )}
    </div>
  );
};

export default ChartsPage;
