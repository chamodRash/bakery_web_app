/*"use client";

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

  const handleSearch

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
*/

"use client";  // This marks this file as a client component

import { Search } from "lucide-react";  // Search icon
import { Button } from "../ui/button";  // Button component
import { Input } from "../ui/input";  // Input component
import { useState, useEffect } from "react";  // For state and effects
import { useRouter } from "next/navigation";  // For routing and updating the URL

interface StockSearchBarProps {
  searchValue: string;  // Current search term passed from the parent
}

const StockSearchBar = ({ searchValue }: StockSearchBarProps) => {
  const [inputValue, setInputValue] = useState(searchValue);  // Local state for input value
  const router = useRouter();  // Router to change the URL

  // Use an effect to detect when inputValue changes and update the URL accordingly
  useEffect(() => {
    if (inputValue) {
      router.push(`/admin/stock?search=${inputValue}`);  // If there's input, add the search term to the URL
    } else {
      router.push("/admin/stock");  // If input is empty, clear the search term from the URL
    }
  }, [inputValue, router]);  // Dependency on inputValue to trigger the effect when it changes

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Trigger search when user presses "Enter"
    if (event.key === "Enter") {
      if (inputValue) {
        router.push(`/admin/stock?search=${inputValue}`);
      } else {
        router.push("/admin/stock");
      }
    }
  };

  return (
    <div className="relative w-1/2 flex flex-col gap-y-1">
      <div className="w-full flex items-center gap-x-2">
        <Input
          value={inputValue}
          placeholder="Search Stock Items"
          onChange={(e) => setInputValue(e.target.value)}  // Update input value as user types
          onKeyDown={handleKeyPress}  // Trigger search on Enter key press
        />
        <Button size={"icon"} variant={"outline"} onClick={() => router.push(`/admin/stock?search=${inputValue}`)}>
          <Search size={18} />
        </Button>
      </div>
    </div>
  );
};

export default StockSearchBar;
