"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm rounded ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
        }`}
      >
        Previous
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 text-sm rounded ${
            currentPage === index + 1
              ? "bg-blue-700 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm rounded ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
