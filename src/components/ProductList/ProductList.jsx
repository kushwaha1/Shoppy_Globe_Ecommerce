import React from 'react'
import ProductItem from '../ProductItem/ProductItem'

function ProductList({ products }) {
    return (
        <div>
            <section className="relative z-20 py-2">
                <ProductItem products={products} />
            </section>
        </div>
    )
}

export default ProductList