"use client";
import React, { useEffect, useState } from "react";
import ToppingCard from "./ToppingCard";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const toppingResponse = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/catalog-service/topping?tenantId=${searchParams.get("tenant")}`
        );
        const toppings = await toppingResponse.json();
        setToppings(toppings.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [setSelectedTopping, searchParams]);
  return (
    <section className=" mt-6">
      <h3>Extra Toppings</h3>
      <div className=" grid grid-cols-3 gap-4 mt-2">
        {toppings.length > 0 ? (
          toppings?.map((topping) => {
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
          })
        ) : (
          <span className=" whitespace-nowrap text-center block">
            {" "}
            No Toppings Available
          </span>
        )}
      </div>
    </section>
  );
};

export default ToppingList;
