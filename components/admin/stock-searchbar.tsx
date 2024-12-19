"use client"; 

import { Search } from "lucide-react";  
import { Button } from "../ui/button";  
import { Input } from "../ui/input";  
import { useState, useEffect } from "react";  
import { useRouter } from "next/navigation"; 

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
