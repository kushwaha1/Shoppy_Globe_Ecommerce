import React from 'react'
import ProductItem from '../ProductItem/ProductItem'

function TopRatedProducts() {
    return (
        <div>
            <section className="relative z-20 py-2">
                <ProductItem title="Top Rated Products" showTopRatedOnly={true} showViewAllButton={true} />
            </section>
        </div>
    )
}

export default TopRatedProducts