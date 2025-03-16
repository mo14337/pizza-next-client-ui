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

export function getItemTotal(product: CartItem) {
  const topingsTotal = product.choosenConfiguration.selectedToppings.reduce(
    (acc, curr) => acc + curr.price,
    0
  );
  const configPrice = Object.entries(
    product.choosenConfiguration.priceConfiguration
  ).reduce((acc, [key, value]: [string, string]) => {
    const price = product.priceConfiguration[key]?.availableOptions[value];
    return acc + price;
  }, 0);
  return topingsTotal + configPrice;
}
