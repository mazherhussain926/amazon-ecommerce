import { createSlice } from "@reduxjs/toolkit";
// Create a slice for the cart
export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [], 
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      // Overwriting the cart array
      state.cart = removeItem;
    },
    incrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decrementQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        if (itemPresent.quantity === 1) {
          const removeItem = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
          state.cart = removeItem;
        } else {
          itemPresent.quantity--;
        }
      }
    },
    cleanCart: (state) => {
      state.cart = [];
    },
  },
});

// Export the actions
export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  cleanCart,
} = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
