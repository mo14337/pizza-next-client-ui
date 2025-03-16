"use client";
import { addInitialCart } from "@/lib/store/features/cart/cartSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import { useRef } from "react";
import { Provider } from "react-redux";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();

    if (typeof window !== "undefined") {
      const cartItems = window.localStorage.getItem("cartItem");
      try {
        const parsedItems = JSON.parse(cartItems as string);
        if (parsedItems) {
          storeRef.current.dispatch(addInitialCart(parsedItems));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
