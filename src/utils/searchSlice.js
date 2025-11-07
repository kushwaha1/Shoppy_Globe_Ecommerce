import { createSlice } from '@reduxjs/toolkit';

// ------------------------------
// Initial State
// ------------------------------
const initialState = {
  query: '' // stores the current search input value
};

// ------------------------------
// Redux Slice
// ------------------------------
const searchSlice = createSlice({
  name: 'search', // name of the slice
  initialState,   // initial state
  reducers: {
    /**
     * Set the search query
     * @param state - current state of the slice
     * @param action - payload contains the new search string
     */
    setSearchQuery(state, action) {
      state.query = action.payload;
    },

    /**
     * Clear the search query (reset to empty string)
     */
    clearSearchQuery(state) {
      state.query = '';
    },
  },
});

// ------------------------------
// Export Actions
// ------------------------------
export const { setSearchQuery, clearSearchQuery } = searchSlice.actions;

// ------------------------------
// Selectors
// ------------------------------

/**
 * Selector to get the current search query from state
 * @param state - entire Redux store state
 * @returns current search query string or empty string if undefined
 */
export const selectSearchQuery = (state) => state.search?.query || '';

// ------------------------------
// Export Reducer
// ------------------------------
export default searchSlice.reducer;