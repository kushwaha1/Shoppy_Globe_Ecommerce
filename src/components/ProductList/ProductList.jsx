import React from 'react';
import ProductItem from '../ProductItem/ProductItem'; // Import reusable ProductItem component
import SearchFilter from '../SearchFilter'; // Import search filter component

/**
 * ProductList Component
 * ---------------------
 * This component displays the main products page with:
 * 1. Search and filter options at the top.
 * 2. A grid/list of all products.
 *
 * It uses two child components:
 * - SearchFilter: Allows users to search and filter products.
 * - ProductItem: Displays the products. Without props, it shows all products.
 */
function ProductList() {
    return (
        <div>
            {/* Section wrapper for the product list page */}
            <section className="relative z-20 py-2">
                
                {/* 
                    SearchFilter Component
                    ----------------------
                    Displays search input and filter options for products.
                    Users can type to filter products by name or category.
                */}
                <SearchFilter />

                {/* 
                    ProductItem Component
                    ---------------------
                    Displays a grid/list of products.
                    Without any props, it shows all products by default.
                    If props are provided, it can show filtered or top-rated products.
                */}
                <ProductItem />
            </section>
        </div>
    );
}

export default ProductList;