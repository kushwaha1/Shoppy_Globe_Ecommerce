import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice"
import searchReducer from "../utils/searchSlice"

const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer
    }
})

export default store