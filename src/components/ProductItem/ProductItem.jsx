import React from 'react'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import "./ProductItem.css"
import ProductApiCalling from '../../Hooks/FetchProduct'

function ProductItem() {
    const { products } = ProductApiCalling()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Featured Products</h2>
                <button className="hidden sm:inline-flex items-center text-white gap-2 text-sm font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition">
                    View all
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {products.map((p) => (
                    <article
                        key={p.id}
                        className="product-card relative bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        {/* badge */}
                        <div className="product-badge absolute top-3 left-3 z-10">
                            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-[#BFA6A0] text-[#031029]"> 
                                {p.category} 
                            </div>
                        </div>

                        {/* image container with fixed aspect ratio */}
                        <div className="product-image w-full relative bg-white/5" style={{ paddingBottom: '100%' }}>
                            <img 
                                src={p.images?.[0]} 
                                alt={p.title} 
                                className="product-image__img absolute inset-0 w-full h-full object-cover"
                            />
                        </div>

                        {/* content */}
                        <div className="p-4 sm:p-5 flex flex-col flex-1">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="product-title text-base sm:text-lg font-semibold text-white line-clamp-2 mb-1">
                                        {p.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-white/60">
                                        Starting from <span className="font-bold text-white">${p.price.toFixed(2)}</span>
                                    </p>
                                </div>

                                {/* rating */}
                                <div className="flex flex-col items-end shrink-0 gap-2">
                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/6 border border-white/8">
                                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs sm:text-sm font-semibold text-white">{p.rating}</span>
                                    </div>

                                    <button 
                                        className="p-1.5 sm:p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                                        aria-label="Add to wishlist"
                                    >
                                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 hover:text-red-400 transition-colors" />
                                    </button>
                                </div>
                            </div>

                            {/* price and action button */}
                            <div className="mt-auto pt-3 border-t border-white/10">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-sm text-white/60">
                                        <div className="text-lg sm:text-xl font-bold product-price text-white">
                                            ${p.price.toFixed(2)}
                                        </div>
                                        <div className="text-xs text-white/50">Inclusive of taxes</div>
                                    </div>

                                    <button
                                        className="group inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold shadow-lg product-add-btn hover:shadow-xl transition-all"
                                        style={{ background: 'linear-gradient(90deg, rgba(191,166,160,1) 0%, rgba(212,190,184,1) 100%)', color: '#031029' }}
                                    >
                                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                                        <span className="text-xs sm:text-sm">Add</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* subtle hover overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#031029]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default ProductItem