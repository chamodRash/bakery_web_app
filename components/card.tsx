import React from 'react';
import { Button } from "@/components/ui/button";
import { HiShoppingCart } from "react-icons/hi";

interface Item {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  desc: string;
  available: number | string;
}

interface CardProps {
  item: Item[];
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className="container mx-auto p-4 place-items-center">
      <div className="mx-10 grid grid-cols-4 gap-4">
        {item.map((val) => (
          <div key={val.id} className="flex justify-center">
            <div className="card border border-gray-200 shadow-lg rounded-3xl" style={{ width: '80%', height: '350px' }}>
              <div className="card-img-top text-center mb-4">
                <img src={val.image} alt={val.title} className="w-full h-48 object-cover rounded-t-3xl" />
              </div>
              <div className="card-body">
                <div className='flex flex-col justify-evenly'>
                  <div className="card-title font-black">
                    <div className='flex justify-evenly text-base'>
                      <div className='text-black font-black pl-2'>{val.title}</div>
                      <div className='text-[#5E3719] font-black'>{val.price}/=</div>
                    </div>
                  </div>
                  <div className="card-text text-gray-500 flex justify-evenly">
                    <div>{val.available} Available</div>
                    <div></div>
                  </div>
                  <div className='flex justify-evenly mt-4'>
                    <Button variant={"default"} size={"lg"} className="rounded-2xl px-12">
                      Buy Now
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      className={
                        "text-[#5E3719] bg-gray-300 rounded-full text-xl flex items-center justify-center size-10 hover:text-[#5E3719] hover:bg-gray-400"
                      }>
                      <HiShoppingCart />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
