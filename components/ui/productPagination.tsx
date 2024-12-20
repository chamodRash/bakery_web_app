"use client";

import React, { useState } from "react";
import ProductsSection from "@/components/products-section";
import Pagination from "@/components/ui/pagination";

interface ProductsWithPaginationProps {
  products: any[]; // Replace `any` with the appropriate type products
}

const ProductsWithPagination: React.FC<ProductsWithPaginationProps> = ({
  products,
}) => {
  const itemsPerPage = 8; // number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get Products for the Current Page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {}
      <ProductsSection items={currentProducts} />

      {}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default ProductsWithPagination;
