import React, { useEffect, useState } from 'react'

function UseFetchProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API = "https://dummyjson.com/products";
        async function apiCalling() {
            try {
                setLoading(true);
                const response = await fetch(API);
                const res = await response.json();
                setProducts(res.products || []);
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

export default UseFetchProducts