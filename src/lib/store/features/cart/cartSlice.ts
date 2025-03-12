import { ITopping } from "@/app/(Home)/_components/ToppingList";
import { IProduct } from "@/lib/types";
import { hashTheItem } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem
  extends Pick<IProduct, "_id" | "name" | "image" | "priceConfiguration"> {
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: ITopping[];
  };
  qty: number;
  hash?: string;
}

interface cartState {
  cartItems: CartItem[];
}

const initialState: cartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const hash = hashTheItem(action.payload);
      const cartItem = { ...action.payload, hash: hash };
      localStorage.setItem(
        "cartItem",
        JSON.stringify([...state.cartItems, cartItem])
      );
      return {
        cartItems: [...state.cartItems, cartItem],
      };
    },
    addInitialCart(state, action: PayloadAction<CartItem[]>) {
      state.cartItems.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, addInitialCart } = cartSlice.actions;

export default cartSlice.reducer;
