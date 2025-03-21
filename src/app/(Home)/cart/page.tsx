"use client";

import CartItem from "./_component/CartItem";
import CartSummary from "./_component/CartSummary";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { changeQty, removeCartItem } from "@/lib/store/features/cart/cartSlice";
import { useMemo } from "react";
import { getItemTotal } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const router = useRouter();
  const cart = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const handleUpdateQuantity = (hash: string, qty: number) => {
    dispatch(changeQty({ hash, qty }));
  };

  const handleRemove = (hash: string) => {
    dispatch(removeCartItem(hash));
  };

  const totalPrice = useMemo(() => {
    const finalTotal = cart.reduce(
      (acc, curr) => getItemTotal(curr) * curr.qty + acc,
      0
    );
    return finalTotal;
  }, [cart]);

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
            onCheckout={() => router.push("/checkout")}
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
