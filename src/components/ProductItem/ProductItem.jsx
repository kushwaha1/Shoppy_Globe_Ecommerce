import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import "./ProductItem.css";
import UseFetchProducts from "../../Hooks/useFetchProduct";

function ProductItem({ showTopRatedOnly = false, showViewAllButton = false }) {
    // Get all products from hook
    const { products = [] } = UseFetchProducts();

    // Filter products with rating >= 4.0, sort by rating, and take top 8
    const displayProducts = showTopRatedOnly
        ? products
            .filter(product => product.rating >= 4.0)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 8)
        : products;

    // If no products
    if (displayProducts.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {showTopRatedOnly ? "Top Rated Products" : "All Products"}
                    </h2>
                    {showViewAllButton && (
                        <Link
                            to="/products"
                            className="hidden sm:inline-flex items-center text-white gap-2 text-sm font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition"
                        >
                            View all
                        </Link>
                    )}
                </div>
                <div className="text-center text-gray-600 py-8">
                    No products available.
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900" style={showTopRatedOnly ? {color: "white"} : {color: "black"}}>
                    {showTopRatedOnly ? "Top Rated Products" : "All Products"}
                </h2>
                {showViewAllButton && (
                    <Link
                        to="/products"
                        className="hidden sm:inline-flex items-center text-white gap-2 text-sm font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition"
                    >
                        View all
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {displayProducts.map((product) => (
                    <article
                        key={product.id}
                        className="product-card relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        {/* Category Badge */}
                        <div className="product-badge absolute top-3 left-3 z-10">
                            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-[#BFA6A0] text-[#031029]">
                                {product.category}
                            </div>
                        </div>

                        {/* Product Image */}
                        <div className="product-image w-full relative bg-white/5" style={{ paddingBottom: "100%" }}>
                            <img
                                src={product.images?.[0] || product.img}
                                alt={product.title}
                                className="product-image__img absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* Product Content */}
                        <div className="p-4 sm:p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="product-title text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                                        {product.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Starting from <span className="font-bold text-gray-900">${Number(product.price).toFixed(2)}</span>
                                    </p>
                                </div>

                                <div className="flex flex-col items-end shrink-0 gap-2">
                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 border border-blue-100">
                                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs sm:text-sm font-semibold text-gray-900">{product.rating}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto pt-3 border-t border-gray-200">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-sm text-gray-600">
                                        <div className="text-lg sm:text-xl font-bold product-price text-gray-900">
                                            ${Number(product.price).toFixed(2)}
                                        </div>
                                        <div className="text-xs text-gray-500">Inclusive of taxes</div>
                                    </div>

                                    <button
                                        className="group inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold shadow-lg product-add-btn hover:shadow-xl transition-all"
                                        style={{ background: "linear-gradient(90deg, rgba(191,166,160,1) 0%, rgba(212,190,184,1) 100%)", color: "#031029" }}
                                    >
                                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs sm:text-sm">Add</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#031029]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default ProductItem;