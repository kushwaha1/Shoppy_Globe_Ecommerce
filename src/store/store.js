import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../utils/cartSlice" 

const store = configureStore({
    reducer: {
        cartReducer
    }
})

export default store