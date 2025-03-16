import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IProduct } from "@/lib/types";
import { ITopping } from "../../_components/ToppingList";
import { useMemo } from "react";

export interface CartItemType
  extends Pick<IProduct, "_id" | "name" | "image" | "priceConfiguration"> {
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: ITopping[];
  };
  qty: number;
  hash?: string;
}
interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const totalPrice = useMemo(() => {
    const topingsTotal = item.choosenConfiguration.selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );
    const configPrice = Object.entries(
      item.choosenConfiguration.priceConfiguration
    ).reduce((acc, [key, value]: [string, string]) => {
      const price = item.priceConfiguration[key]?.availableOptions[value];
      return acc + price;
    }, 0);
    return topingsTotal + configPrice;
  }, [item]);
  const choosenConfig = Object.values(
    item.choosenConfiguration.priceConfiguration
  ).join(", ");

  const choosenToppings = item.choosenConfiguration.selectedToppings
    .map((topping) => topping.name)
    .join(", ");
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <Image
          src={item.image}
          alt={item.name}
          width={50}
          height={50}
          className="rounded-md"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm text-gray-500">{choosenConfig}</p>
          <p className="text-sm text-gray-500">{choosenToppings}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-lg px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item.hash!, -1)}
          >
            <Minus size={16} />
          </Button>
          <span className="px-2">{item.qty}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item.hash!, 1)}
          >
            <Plus size={16} />
          </Button>
        </div>
        <p className="font-semibold">₹{totalPrice}</p>
        <Button variant="ghost" size="icon" onClick={() => onRemove(item._id)}>
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}
