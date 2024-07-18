import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/logo.png';
import Data from '@/actions/data';
import { ChevronLeft, ChevronRight } from "react-feather";

interface CategoryItem {
  category: string;
  image: string;
}

interface CategoryButtonProps {
  categoryItems: CategoryItem[];
  filterItems: (category: string) => void;
  setItems: (items: typeof Data) => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ categoryItems, filterItems, setItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 8;

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleNextClick = () => {
    if (currentIndex + itemsPerPage < categoryItems.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  return (
    <div className='flex justify-center items-center space-x-4'>
      <button onClick={handlePrevClick} className='p-1 rounded-full shadow bg-gray text-gray-800 hover:bg-white bg-opacity-50'>
        <ChevronLeft size={30} />
      </button>
      <div className='flex space-x-4'>
        {categoryItems.slice(currentIndex, currentIndex + itemsPerPage).map(({ category, image }) => (
          <button
            key={category}
            className='flex flex-col items-center'
            onClick={() => filterItems(category)}
          >
            <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300'>
              <Image src={image} width={96} height={96} alt={category} className='object-cover' />
            </div>
            <p className='mt-2 text-center font-semibold'>{category}</p>
          </button>
        ))}
        {currentIndex + itemsPerPage >= categoryItems.length && (
          <button className='flex flex-col items-center' onClick={() => setItems(Data)}>
            <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300'>
              <Image src={logo} width={96} height={96} alt="All" className='object-cover' />
            </div>
            <p className='mt-2 text-center font-semibold'>All</p>
          </button>
        )}
      </div>
      <button onClick={handleNextClick} className='p-1 rounded-full shadow bg-white/40 text-gray-800 hover:bg-white bg-opacity-50'>
        <ChevronRight size={30} />
      </button>
    </div>
  );
}

export default CategoryButton;
