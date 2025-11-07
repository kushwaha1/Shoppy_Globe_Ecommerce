import React from 'react';
import ProductItem from '../ProductItem/ProductItem'; // Import the reusable ProductItem component

/**
 * TopRatedProducts Component
 * --------------------------
 * This component is used to display a section of top-rated products.
 * It uses the ProductItem component with specific props to show only top-rated products.
 */
function TopRatedProducts() {
    return (
        <div>
            {/* Section wrapper for Top Rated Products */}
            <section className="relative z-20 py-2">
                
                {/* 
                    ProductItem Component
                    ---------------------
                    Props:
                    - title: The heading of this section
                    - showTopRatedOnly: Filters and shows only products with rating >= 4
                    - showViewAllButton: Shows a "View All" button linking to /products page
                */}
                <ProductItem 
                    title="Top Rated Products" 
                    showTopRatedOnly={true} 
                    showViewAllButton={true} 
                />
            </section>
        </div>
    );
}

export default TopRatedProducts;