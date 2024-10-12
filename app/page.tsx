"use client";

import React, { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

import Navbar from "@/components/navbar";
import CarouselSection from "@/components/carousel-section";
import CategoryButtonSection from "@/components/categoryButton-section";
import CartSection from "@/components/cart-section";
import FilteredProductsSection from "@/components/filterProductSection";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink, PaginationEllipsis } from "@/components/ui/pagination";

import { DataItem } from "@/data/types";

export default function Home() {
  const supabase = createClient();
  const [loggedUser, setLoggedUser] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<DataItem[]>([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8; // Number of items per page

  const handleSetItems = (items: DataItem[], categoryName: string) => {
    setFilteredItems(items);
    setCategoryName(categoryName);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const getDbUser = useCallback(async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (user?.is_anonymous === true || user === null || error) {
      setLoggedUser(false);
      return;
    }
    setLoggedUser(true);
  }, [supabase]);

  useEffect(() => {
    getDbUser();
  }, [getDbUser, loggedUser]);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Get items for the current page
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handlers for pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pb-16 w-full bg-[#EEF5FF] pt-24">
      <Navbar user={loggedUser} />
      <CarouselSection />
      <CategoryButtonSection setItems={handleSetItems} />

      {filteredItems.length > 0 ? (
        <>
          <FilteredProductsSection
            items={currentItems}
            categoryName={categoryName}
          />
          <Pagination>
            <PaginationContent>
              <PaginationPrevious
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => handlePageSelect(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationNext
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              />
            </PaginationContent>
          </Pagination>
        </>
      ) : (
        <CartSection />
      )}
    </div>
  );
}
