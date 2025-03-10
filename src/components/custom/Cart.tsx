"use client";
import { useAppSelector } from "@/lib/store/hooks";
import { ShoppingBasketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cart = () => {
  const cartCount = useAppSelector((state) => state.cart.value);
  return (
    <div className=" relative">
      <Link href={"/"}>
        <ShoppingBasketIcon />
        <span className=" absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
          {cartCount}
        </span>
      </Link>
    </div>
  );
};

export default Cart;
