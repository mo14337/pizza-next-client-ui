import { CartItem } from "@/lib/store/features/cart/cartSlice";
import { getItemTotal } from "@/lib/utils";
import { useMemo } from "react";

export function useTotal(product: CartItem) {
  const totalPrice = useMemo(() => {
    return getItemTotal(product);
  }, [product]);
  return totalPrice;
}
