import React from "react";
import { ProductCard } from "./product-card";

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
        {item.map((val, index) => (
          <ProductCard
            key={index}
            id={val.id}
            name={val.title}
            price={val.price}
            image={val.image}
            qty={val.available}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
