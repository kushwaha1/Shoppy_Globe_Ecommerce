import React from 'react'
import ProductItem from '../ProductItem/ProductItem'

function TopRatedProducts({ products }) {
    return (
        <div>
            <section className="relative z-20 py-2">
                <ProductItem products={products} showTopRatedOnly={true} showViewAllButton={true} />
            </section>
        </div>
    )
}

export default TopRatedProducts