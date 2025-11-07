import React, { useEffect, useState } from 'react';

/**
 * Custom Hook: useFetchProducts
 * 
 * Fetches a list of products from a remote API and provides loading and error states.
 * This hook can be used in any component to get products data.
 */
function UseFetchProducts() {
    // -----------------------------
    // State variables
    // -----------------------------
    const [products, setProducts] = useState([]); // Stores fetched products
    const [loading, setLoading] = useState(true); // Indicates whether the fetch is in progress
    const [error, setError] = useState(null); // Stores error message if fetch fails

    // -----------------------------
    // useEffect to fetch data once on component mount
    // -----------------------------
    useEffect(() => {
        const API = "https://dummyjson.com/products"; // API endpoint to fetch products

        // Async function to call API
        async function apiCalling() {
            try {
                setLoading(true); // Set loading to true before fetching
                const response = await fetch(API); // Fetch data from API
                const res = await response.json(); // Parse JSON response

                // Update state with products or empty array if no products
                setProducts(res.products || []);

                // Reset error state on successful fetch
                setError(null);
            } catch (err) {
                // Handle errors during fetch
                setError(err.message); // Save error message
                setProducts([]); // Clear products if fetch fails
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        }

        apiCalling(); // Call the async function
    }, []); // Empty dependency array => runs only once when component mounts

    // Return data and states to be used in any component
    return { products, loading, error };
}

export default UseFetchProducts;