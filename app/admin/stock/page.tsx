/*"use server";

import Image from "next/image";

import { CategoryItem, DataItem } from "@/data/types";
import { Button } from "@/components/ui/button";

import { getStock } from "@/data/stock";
import StockTable from "@/components/admin/stock-table";
import AddStock from "@/components/admin/add-stock";
import { Input } from "@/components/ui/input";
import StockSearchBar from "@/components/admin/stock-searchbar";

const StockPage = async () => {
  const stock = await getStock();

  return (
    <div className="w-full">
      <div className="w-full px-10 py-3 flex items-center justify-center bg-secondary">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-bold text-lg text-zinc-700">Stocks</h3>
          <StockSearchBar stock={stock} />
          <AddStock>
            <Button>Add Stock</Button>
          </AddStock>
        </div>
      </div>
      <div className="w-10/12 mx-auto mt-4 overflow-auto">
        <StockTable stock={stock} />
      </div>
    </div>
  );
};

export default StockPage;
*/


"use server";  // This marks this file as a server component

import { getStock } from "@/data/stock";  // Fetch stock data from the server
import StockTable from "@/components/admin/stock-table";  // Table component for displaying stock
import AddStock from "@/components/admin/add-stock";  // Component for adding new stock
import { Button } from "@/components/ui/button";  // UI button component
import StockSearchBar from "@/components/admin/stock-searchbar";  // Search bar component

interface StockPageProps {
  searchParams: { search?: string };  // Query parameters that might include a 'search' parameter
}

const StockPage = async ({ searchParams }: StockPageProps) => {
  const stock = await getStock();  // Get all stock data from the server
  const searchValue = searchParams.search || "";  // Retrieve the search term from URL or default to empty string

  // Filter stock based on the search term
  const filteredStock = searchValue
    ? stock.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())  // Case-insensitive filtering
      )
    : stock;  // If no search term, display all stock items

  return (
    <div className="w-full">
      <div className="w-full px-10 py-3 flex items-center justify-center bg-secondary">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-bold text-lg text-zinc-700">Stocks</h3>
          <StockSearchBar searchValue={searchValue} /> {/* Pass the current search term to the search bar */}
          <AddStock>
            <Button>Add Stock</Button>
          </AddStock>
        </div>
      </div>
      <div className="w-10/12 mx-auto mt-4 overflow-auto">
        <StockTable stock={filteredStock} /> {/* Display filtered or all stock */}
      </div>
    </div>
  );
};

export default StockPage;
