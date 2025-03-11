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
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  const isLocalStorageAvailable =
    typeof window !== undefined && window.localStorage;
  if (isLocalStorageAvailable) {
    const cartItems = window.localStorage.getItem("cartItem");
    try {
      const parsedItems = JSON.parse(cartItems as string);
      storeRef.current.dispatch(addInitialCart(parsedItems));
    } catch (error) {
      console.log(error);
    }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
