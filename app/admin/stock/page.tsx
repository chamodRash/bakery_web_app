"use server";

import Image from "next/image";

import { CategoryItem, DataItem } from "@/data/types";
import { Button } from "@/components/ui/button";

import { getStock } from "@/data/stock";
import StockTable from "@/components/admin/stock-table";
import AddStock from "@/components/admin/add-stock";

const StockPage = async () => {
  const stock = await getStock();

  const deleteStock = (stockID: string) => {
    // Delete categories
    console.log("Delete categories");
  };

  return (
    <div className="w-full">
      <div className="w-full px-10 py-3 flex items-center justify-center bg-secondary">
        <div className="w-full flex items-center justify-between">
          <h3 className="font-bold text-lg text-zinc-700">Stocks</h3>
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
