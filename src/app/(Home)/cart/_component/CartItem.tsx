import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    description: string;
    quantity: number;
    price: number;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
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
          <p className="text-sm text-gray-500">{item.description}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center border rounded-lg px-2 py-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            <Minus size={16} />
          </Button>
          <span className="px-2">{item.quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Plus size={16} />
          </Button>
        </div>
        <p className="font-semibold">₹{item.price}</p>
        <Button variant="ghost" size="icon" onClick={() => onRemove(item.id)}>
          <X size={16} />
        </Button>
      </div>
    </div>
  );
}
