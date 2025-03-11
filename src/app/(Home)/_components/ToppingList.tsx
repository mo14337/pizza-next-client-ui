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
const ToppingList = ({
  selectedTopping,
  setSelectedTopping,
  handleToppingClick,
}: {
  selectedTopping: ITopping[];
  setSelectedTopping: React.Dispatch<React.SetStateAction<ITopping[]>>;
  handleToppingClick: (arg: ITopping) => void;
}) => {
  const [toppings, setToppings] = useState<ITopping[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const toppingResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/catalog-service/topping`
        );
        const toppings = await toppingResponse.json();
        setToppings(toppings.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setSelectedTopping]);
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
