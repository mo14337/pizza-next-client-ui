import { ITopping } from "@/app/(Home)/_components/ToppingList";
import { IProduct } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  product: IProduct;
  choosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: ITopping[];
  };
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
      const cartItem = {
        product: action.payload.product,
        choosenConfiguration: action.payload.choosenConfiguration,
      };
      localStorage.setItem(
        "cartItem",
        JSON.stringify([...state.cartItems, cartItem])
      );
      console.log("heyy");
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
