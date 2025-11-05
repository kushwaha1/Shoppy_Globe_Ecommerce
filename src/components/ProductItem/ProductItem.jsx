// ProductItem.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductItem.css";
import UseFetchProducts from "../../Hooks/useFetchProduct";
import { addToCart, removeFromCart, updateQuantity, selectCartItems } from "../../utils/cartSlice";
import { selectSearchQuery } from "../../utils/searchSlice";

function ProductItem({ title, showTopRatedOnly = false, showViewAllButton = false }) {
  const { products = [] } = UseFetchProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // read cart items from redux (using selector exported above)
  const cartItems = useSelector((state) => (state.cart && state.cart.items) || []);

    // read current search query from redux
  const searchQuery = useSelector(selectSearchQuery).toLowerCase?.() || '';

  let filterProducts = showTopRatedOnly
    ? products
        .filter(product => product.rating >= 4.0)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8)
    : products;

  // Apply search filter from redux (case-insensitive substring match)
  if (searchQuery) {
    const q = searchQuery.trim();
    filterProducts = filterProducts.filter((p) => {
      const titleMatch = (p.title || '').toLowerCase().includes(q);
      const categoryMatch = (p.category || '').toLowerCase().includes(q);
      // match either title or category
      return titleMatch || categoryMatch;
    });
  }

  const displayProducts = filterProducts;

  const getQty = (productId) => {
    const entry = cartItems.find(
      it => Number(it.id) === Number(productId) || (it.product && Number(it.product.id) === Number(productId))
    );
    return entry ? (entry.quantity || 0) : 0;
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    // add normalized product — slice will merge/increment if exists
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.images?.[0] ?? product.thumbnail, product }));
  };

  const handleIncrement = (e, productId, product) => {
    e.preventDefault();
    e.stopPropagation();
    // increment by 1
    dispatch(addToCart({ id: productId, product, quantity: 1 }));
  };

  const handleDecrement = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    const currentQty = getQty(productId);
    if (currentQty <= 1) {
      dispatch(removeFromCart(productId));
    } else {
      dispatch(updateQuantity({ id: productId, quantity: currentQty - 1 }));
    }
  };

  const handleBuyNow = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    if (getQty(product.id) === 0) {
      dispatch(addToCart({ id: product.id, product, quantity: 1 }));
    }
    navigate("/checkout");
  };

  if (displayProducts.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {title ? title : `Showing ${displayProducts.length} results`}
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
        <div className="text-center text-gray-600 py-8">No products available.</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900" style={showTopRatedOnly ? { color: "white" } : { color: "black" }}>
          {title ? title : `Showing ${displayProducts.length} results`}
        </h2>
        {showViewAllButton && (
          <Link to="/products" className="hidden sm:inline-flex items-center text-white gap-2 text-sm font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition">
            View all
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayProducts.map((product) => {
          const currentQty = getQty(product.id);

          return (
            <Link to={`/products/${product.id}`} key={product.id}>
              <article className="product-card relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="product-badge absolute top-3 left-3 z-10">
                  <div className="px-3 py-1 rounded-full text-xs font-semibold bg-[#BFA6A0] text-[#031029]">{product.category}</div>
                </div>

                <div className="product-image w-full relative bg-white/5" style={{ paddingBottom: "100%" }}>
                  <img src={product.images?.[0] || product.img || product.thumbnail} alt={product.title} className="product-image__img absolute inset-0 w-full h-full object-cover" />
                </div>

                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="product-title text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-1">{product.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Starting from <span className="font-bold text-gray-900">${Number(product.price).toFixed(2)}</span></p>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-2">
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-50 border border-blue-100">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm font-semibold text-gray-900">{product.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="text-sm text-gray-600">
                        <div className="text-lg sm:text-xl font-bold product-price text-gray-900">${Number(product.price).toFixed(2)}</div>
                        <div className="text-xs text-gray-500">Inclusive of taxes</div>
                      </div>
                    </div>

                    <div className="flex gap-2 items-center justify-center">
                      {currentQty > 0 && (
                        <div className="flex items-center justify-center">
                          <button onClick={(e) => handleDecrement(e, product.id)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="text-lg font-bold min-w-[2rem] text-center">{currentQty}</span>
                          <button onClick={(e) => handleIncrement(e, product.id, product)} className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                      )}

                      {currentQty === 0 ? (
                        <button onClick={(e) => handleAddToCart(e, product)} className="flex-1 group inline-flex items-center justify-center gap-2 cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold shadow-lg product-add-btn hover:shadow-xl transition-all border-2 border-[#BFA6A0] text-[#00073f] hover:bg-[#00073f] hover:text-[#BFA6A0]">
                          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
                          <span className="text-xs sm:text-sm">Add to Cart</span>
                        </button>
                      ) : (
                        <button onClick={(e) => handleBuyNow(e, product)} className="flex-1 inline-flex items-center justify-center gap-2 cursor-pointer px-3 py-2 sm:px-4 sm:py-2.5 rounded-full font-semibold shadow-lg border-2 border-[#BFA6A0] text-[#00073f] hover:bg-[#00073f] hover:text-[#BFA6A0] transition-all">
                          <span className="text-xs sm:text-sm">Buy Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#031029]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" aria-hidden="true"></div>
              </article>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProductItem;