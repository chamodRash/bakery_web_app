"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { stockProps } from "@/data/types";
import { useState } from "react";

interface StockTableProps {
  stock: stockProps[];
}

const StockSearchBar = ({ stock }: StockTableProps) => {
  const [filteredStock, setFilteredStock] = useState<stockProps[]>([]);

  const searchStock = (value: string) => {
    if (!value) {
      setFilteredStock([]);
      return;
    }
    const filtered = stock.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStock(filtered);
  };

  return (
    <div className="relative w-1/2 flex flex-col gap-y-1">
      <div className="w-full flex items-center gap-x-2">
        <Input
          placeholder="Search Stock Items"
          className=""
          onChange={(e) => {
            searchStock(e.target.value);
          }}
        />
        <Button size={"icon"} variant={"outline"}>
          <Search size={18} />
        </Button>
      </div>
      {filteredStock && filteredStock.length > 0 && (
        <div className="absolute top-full mt-2 left-0 w-full px-5 py-3 rounded-lg space-y-2 bg-white z-30">
          {filteredStock.map((item) => (
            <p key={item.id} className="text-sm font-semibold text-zinc-600">
              {item.name}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StockSearchBar;
