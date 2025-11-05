import React from 'react'
import ProductItem from '../ProductItem/ProductItem'
import SearchFilter from '../SearchFilter';

function ProductList() {
    return (
        <div>
            <section className="relative z-20 py-2">
                <SearchFilter />
                <ProductItem />
            </section>
        </div>
    )
}

export default ProductList