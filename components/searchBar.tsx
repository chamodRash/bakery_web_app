"use client";
import { Search } from "lucide-react";
import { Button } from "./ui/button";


import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { DataItem } from "@/data/types";  
import { getProductsBySearch } from "@/data/product";  
import Link from "next/link";

type Props = {};
export const SearchBar = ({}: Props) => {
  const route = useRouter();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState<string | undefined>(undefined);
  const [products, setProducts] = useState<DataItem[]>([]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProductsBySearch(value || "");
        setProducts(res as any|| []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } 
    }; 
    fetchData();
  }, [searchParams]);
  
  return (
    <>
      <div className="relative flex flex-col w-1/2 mx-auto bg-white">
        <div className="relative w-full">
          <Input
          type="text"
          placeholder="Search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            handleSearch(e.target.value);
          }}
                          
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus-visible:ring-0"
          />
         
          <Button
            size={"icon"}
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary rounded-r-lg rounded-l-none border border-primary "
            onClick={() => route.push(`/search?query=${value}`)}
          >
            <Search />
          </Button>

          
        </div>
        {value && (
          <div className="w-full p-5 space-y-2 absolute top-[60%] left-0 mt-5 rounded-b-lg bg-white">
            {products.filter(products => {
              const query = (value || "").toLowerCase();
              return query 
            })
            .map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
              )
              )}
          </div>
         )}
        
      </div>
      
    </>
    
  );
};
