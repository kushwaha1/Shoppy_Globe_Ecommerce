import axios from 'axios';
import React, { useEffect, useState } from 'react'

function ProductApiCalling() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API = "https://dummyjson.com/products";
        async function apiCalling() {
            try {
                setLoading(true);
                const response = await axios.get(API);
                setProducts(response.data.products || []);
                setError(null);
            } catch (err) {
                setError(err.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        apiCalling()
    }, [])

    return { products, loading, error }
}

export default ProductApiCalling