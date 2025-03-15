"use client";

import { useState } from "react";
import CartItem from "./_component/CartItem";
import CartSummary from "./_component/CartSummary";

const initialCart = [
  {
    id: "1",
    name: "Mushroom Pizza",
    image: "/pizza-main.png",
    description: "Small, Thin, Chicken",
    quantity: 4,
    price: 2200,
  },
  {
    id: "2",
    name: "Mushroom Pizza",
    image: "/pizza-main.png",
    description: "Small, Thin, Chicken, Mushroom",
    quantity: 3,
    price: 1800,
  },
];

export default function ShoppingCart() {
  const [cart, setCart] = useState(initialCart);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(
      cart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="w-[70vw] mx-auto p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Shopping cart</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
          />
        ))}
        <CartSummary
          totalPrice={totalPrice}
          onCheckout={() => alert("Proceeding to checkout")}
        />
      </div>
    </div>
  );
}
