import { createSlice } from "@reduxjs/toolkit";

// ------------------------------
// Constants
// ------------------------------
const STORAGE_KEY = "cart_v1"; // Key used to store cart data in localStorage

// ------------------------------
// Helper Functions
// ------------------------------

/**
 * Load cart state from localStorage.
 * Returns a default object with empty items array if nothing found or on error.
 */
const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [] };
    return JSON.parse(raw); // parse JSON string to object
  } catch (e) {
    console.warn("Could not load cart from storage", e);
    return { items: [] };
  }
};

/**
 * Save current cart state to localStorage.
 */
const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save cart to storage", e);
  }
};

/**
 * Find the index of a cart item by id.
 * Supports both normalized items and items with nested `product` object.
 */
const findIndex = (items, id) =>
  items.findIndex(
    i => Number(i.id) === Number(id) || (i.product && Number(i.product.id) === Number(id))
  );

// ------------------------------
// Initial State
// ------------------------------
const storageItems = loadFromStorage(); // load saved cart from localStorage

// ------------------------------
// Redux Slice
// ------------------------------
const cartSlice = createSlice({
  name: "cart",
  initialState: storageItems || { items: [] }, // use loaded storage or default
  reducers: {
    /**
     * Add product to cart
     * - If product exists, increment quantity
     * - Else, normalize shape and add new item
     * - Payload can contain: {id, title, price, image, quantity} or full `product` object
     */
    addToCart: (state, action) => {
      const payload = { ...action.payload };
      payload.quantity = payload.quantity ?? 1; // default quantity = 1

      const idx = findIndex(state.items, payload.id ?? payload.product?.id);
      if (idx >= 0) {
        // Item already in cart, increment quantity
        state.items[idx].quantity = (state.items[idx].quantity || 0) + Number(payload.quantity);
      } else {
        // Normalize new cart item shape
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

      saveToStorage(state); // persist changes
    },

    /**
     * Remove product from cart by id
     */
    removeFromCart: (state, action) => {
      const id = action.payload?.id ?? action.payload;
      state.items = state.items.filter(item => Number(item.id) !== Number(id));
      saveToStorage(state); // persist changes
    },

    /**
     * Update the quantity of a product in the cart
     * - If quantity <= 0, remove item from cart
     */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const idx = findIndex(state.items, id);
      if (idx >= 0) {
        const qty = Math.max(0, Number(quantity)); // prevent negative quantities
        if (qty === 0) {
          state.items.splice(idx, 1); // remove item if quantity is 0
        } else {
          state.items[idx].quantity = qty;
        }
      }
      saveToStorage(state); // persist changes
    },

    /**
     * Clear all items from the cart
     */
    clearCart: (state) => {
      state.items = [];
      saveToStorage(state); // persist changes
    },
  }
});

// ------------------------------
// Export Actions and Reducer
// ------------------------------
export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// ------------------------------
// Selectors
// ------------------------------

/**
 * Get all cart items
 */
export const selectCartItems = (state) => (state?.cart?.items) ?? [];

/**
 * Get total number of items in the cart
 */
export const selectCartCount = (state) =>
  (state?.cart?.items ?? []).reduce((sum, it) => sum + (it.quantity || 0), 0);

/**
 * Get subtotal of all items in the cart
 */
export const selectCartSubtotal = (state) =>
  (state?.cart?.items ?? []).reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );
