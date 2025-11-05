// utils/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "cart_v1";

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Could not load cart from storage", e);
    return { items: [] };
  }
};

const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save cart to storage", e);
  }
};

// USE the loaded storage as initial state
const storageItems = loadFromStorage();

const findIndex = (items, id) => items.findIndex(i => Number(i.id) === Number(id) || (i.product && Number(i.product.id) === Number(id)));

const cartSlice = createSlice({
  name: "cart",
  initialState: storageItems || { items: [] },
  reducers: {
    addToCart: (state, action) => {
      // action.payload should contain: { id, title, price, image, quantity? } or full product
      const payload = { ...action.payload };
      payload.quantity = payload.quantity ?? 1;

      const idx = findIndex(state.items, payload.id ?? payload.product?.id);
      if (idx >= 0) {
        state.items[idx].quantity = (state.items[idx].quantity || 0) + Number(payload.quantity);
      } else {
        // normalize shape: ensure item has id and quantity
        const id = payload.id ?? (payload.product && payload.product.id);
        const item = {
          id,
          title: payload.title ?? payload.product?.title,
          price: payload.price ?? payload.product?.price,
          image: payload.image ?? payload.product?.images?.[0] ?? payload.product?.thumbnail,
          product: payload.product ?? undefined,
          quantity: Number(payload.quantity)
        };
        state.items.push(item);
      }
      saveToStorage(state);
    },
    removeFromCart: (state, action) => {
      const id = action.payload?.id ?? action.payload;
      state.items = state.items.filter(item => Number(item.id) !== Number(id));
      saveToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const idx = findIndex(state.items, id);
      if (idx >= 0) {
        const qty = Math.max(0, Number(quantity));
        if (qty === 0) {
          state.items.splice(idx, 1);
        } else {
          state.items[idx].quantity = qty;
        }
      }
      saveToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      saveToStorage(state);
    },
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// selectors
export const selectCartItems = (state) => (state?.cart?.items) ?? [];
export const selectCartCount = (state) =>
  (state?.cart?.items ?? []).reduce((sum, it) => sum + (it.quantity || 0), 0);
export const selectCartSubtotal = (state) =>
  (state?.cart?.items ?? []).reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0);
