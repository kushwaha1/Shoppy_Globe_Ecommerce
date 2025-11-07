import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice";    // Reducer for cart state management
import searchReducer from "../utils/searchSlice"; // Reducer for search state management

/**
 * Configure Redux Store
 * 
 * This store combines all slices (cart, search) into a single centralized state.
 * Each slice manages its own part of the state.
 * 
 * - cart: manages shopping cart items, quantity, subtotal, etc.
 * - search: manages search query state.
 */
const store = configureStore({
    reducer: {
        cart: cartReducer,      // Attach cart slice
        search: searchReducer,  // Attach search slice
    },
});

export default store;