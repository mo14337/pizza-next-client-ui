import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { ITopping } from "./ToppingList";
import { CircleCheck } from "lucide-react";

type PropsTypes = {
  topping: ITopping;
  selectedTopping: ITopping[];
  handleToppingClick: (arg: ITopping) => void;
};

const ToppingCard = ({
  topping,
  selectedTopping,
  handleToppingClick,
}: PropsTypes) => {
  const isCurrentSelected = selectedTopping?.some(
    (elm) => elm._id === topping._id
  );
  return (
    <Button
      onClick={() => handleToppingClick(topping)}
      variant={"outline"}
      className={` relative flex flex-col bg-white h-42 ${
        isCurrentSelected && "border-orange-500"
      }`}
    >
      <Image src={topping.image} width={60} height={60} alt={topping.name} />
      <h4>{topping.name}</h4>
      <p>&#8377;{topping.price}</p>
      {isCurrentSelected && (
        <CircleCheck className=" absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
