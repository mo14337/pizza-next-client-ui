/* eslint-disable @typescript-eslint/no-unused-vars */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/cartSlice";
import CryptoJS from "crypto-js";
import { IProduct } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function hashTheItem(payload: CartItem) {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });
  const hash = CryptoJS.SHA256(jsonString).toString();
  return hash;
}

export function getFromPrice(product: IProduct) {
  const basePrice = Object.entries(product.priceConfiguration)
    .filter(([_key, value]) => {
      return value.priceType === "base";
    })
    .reduce((acc, [_key, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions));
      return acc + smallestPrice;
    }, 0);

  return basePrice;
}
