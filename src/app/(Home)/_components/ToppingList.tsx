"use client";
import React, { useState } from "react";
import ToppingCard from "./ToppingCard";

export interface ITopping {
  id: string;
  name: string;
  image: string;
  price: number;
  isAvailable: boolean;
}
const data: ITopping[] = [
  {
    id: "1",
    name: "Chicken",
    image: "/pizza-main.png",
    price: 50,
    isAvailable: true,
  },
  {
    id: "2",
    name: "Cheese",
    image: "/pizza-main.png",
    price: 50,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Olivs",
    image: "/pizza-main.png",
    price: 50,
    isAvailable: true,
  },
];
const ToppingList = () => {
  const [selectedTopping, setSelectedTopping] = useState<ITopping[]>([data[0]]);
  const handleTopppppinfClick = (topping: ITopping) => {
    const isAlreadyExists = selectedTopping.some(
      (elm) => elm.id === topping.id
    );
    if (isAlreadyExists) {
      setSelectedTopping((prev) => prev.filter((elm) => elm.id !== topping.id));
      return;
    }

    setSelectedTopping((prev) => [...prev, topping]);
  };
  return (
    <section className=" mt-6">
      <h3>Extra Toppings</h3>
      <div className=" grid grid-cols-3 gap-4 mt-2">
        {data.map((topping) => {
          return (
            <ToppingCard
              handleToppingClick={handleTopppppinfClick}
              selectedTopping={selectedTopping}
              key={topping.id}
              topping={topping}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
