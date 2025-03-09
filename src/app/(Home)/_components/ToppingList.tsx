"use client";
import React, { useEffect, useState } from "react";
import ToppingCard from "./ToppingCard";

export interface ITopping {
  _id: string;
  name: string;
  image: string;
  price: number;
  isPublish: boolean;
}
const ToppingList = () => {
  const [toppings, setToppings] = useState<ITopping[]>([]);
  const [selectedTopping, setSelectedTopping] = useState<ITopping[]>([]);
  const handleToppingClick = (topping: ITopping) => {
    const isAlreadyExists = selectedTopping.some(
      (elm) => elm._id === topping._id
    );
    if (isAlreadyExists) {
      setSelectedTopping((prev) =>
        prev.filter((elm) => elm._id !== topping._id)
      );
      return;
    }

    setSelectedTopping((prev) => [...prev, topping]);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const toppingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalog-service/topping`
        );
        const toppings = await toppingResponse.json();
        console.log(toppings.data);
        setToppings(toppings.data);
        setSelectedTopping([toppings.data[0]]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <section className=" mt-6">
      <h3>Extra Toppings</h3>
      <div className=" grid grid-cols-3 gap-4 mt-2">
        {toppings?.map((topping) => {
          if (!topping.isPublish) {
            return;
          }
          return (
            <ToppingCard
              handleToppingClick={handleToppingClick}
              selectedTopping={selectedTopping}
              key={topping._id}
              topping={topping}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
