"use client";

import CartItem from "./_component/CartItem";
import CartSummary from "./_component/CartSummary";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { changeQty, removeCartItem } from "@/lib/store/features/cart/cartSlice";

export default function ShoppingCart() {
  const cart = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (hash: string, qty: number) => {
    dispatch(changeQty({ hash, qty }));
  };

  const handleRemove = (hash: string) => {
    dispatch(removeCartItem(hash));
  };

  const totalPrice = 0;
  //  useMemo(() => {
  //   // const topingsTotal = selectedTopping.reduce(
  //   //   (acc, curr) => acc + curr.price,
  //   //   0
  //   // );
  //   // const configPrice = Object.entries(choosenConfig).reduce(
  //   //   (acc, [key, value]: [string, string]) => {
  //   //     const price = product.priceConfiguration[key]?.availableOptions[value];
  //   //     return acc + price;
  //   //   },
  //   //   0
  //   // );
  //   // return topingsTotal + configPrice;
  // }, []);

  return (
    <div className="w-[70vw] mx-auto p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Shopping cart</h2>
      {cart.length > 0 ? (
        <div className="bg-white p-4 rounded-lg shadow-md">
          {cart.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
          <CartSummary
            totalPrice={totalPrice || 0}
            onCheckout={() => alert("Proceeding to checkout")}
          />
        </div>
      ) : (
        <div className=" flex items-center gap-3">
          <ShoppingCartIcon />
          <p>
            Your cart is empty!{" "}
            <Link href={"/"} className="text-primary">
              continue shopping?
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
