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
      return {
        cartItems: [
          ...state.cartItems,
          {
            product: action.payload.product,
            choosenConfiguration: action.payload.choosenConfiguration,
          },
        ],
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
