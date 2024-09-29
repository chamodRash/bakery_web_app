"use client";

import { useState } from "react";

import { DataItem } from "@/data/types";

import CategoryButtonSection from "@/components/categoryButton-section";
import CartSection from "@/components/cart-section";
import FilteredProductsSection from "@/components/filterProductSection";

const ProductPage = () => {
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");

  const handleSetItems = (items: DataItem[], categoryName: string) => {
    setFilteredItems(items);
    setCategoryName(categoryName);
  };

  return (
    <div>
      <CategoryButtonSection setItems={handleSetItems} />

      {filteredItems.length > 0 ? (
        <FilteredProductsSection
          items={filteredItems}
          categoryName={categoryName}
        />
      ) : (
        <CartSection />
      )}
    </div>
  );
};

export default ProductPage;
