import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux/cartSlice";

// Configure the store with the cart reducer
const store = configureStore({
  reducer: { cart: cartReducer },
});

export default store;
