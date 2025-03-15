"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const CartCount = () => {
  const cartCount = useAppSelector((state) => state.cart.cartItems);
  return (
    <div className=" relative">
      <Link href={"/cart"}>
        <ShoppingBasketIcon />
        <span className=" absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
          {cartCount.length || 0}
        </span>
      </Link>
    </div>
  );
};

export default CartCount;
