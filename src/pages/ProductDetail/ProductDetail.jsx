import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft, Minus, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css";
import UseFetchProducts from "../../Hooks/useFetchProduct";
import { addToCart, removeFromCart, updateQuantity } from "../../utils/cartSlice";
import LazyImage from "../../components/LazyImage/LazyImage";

function ProductDetail() {
  const { id } = useParams();
  const { products = [] } = UseFetchProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const cartItems = useSelector((state) => (state.cart && state.cart.items) || []);

  useEffect(() => {
    const foundProduct = products.find((p) => Number(p.id) === Number(id));
    setProduct(foundProduct || null);
    if (foundProduct) setSelectedImage(0);
  }, [id, products]);

  // sync with redux cart (can be 0)
  useEffect(() => {
    if (!product) return;
    const entry = cartItems.find(
      (it) => Number(it.id) === Number(product.id) || (it.product && Number(it.product.id) === Number(product.id))
    );
    const qty = entry ? (entry.quantity ?? entry.qty ?? 0) : 0;
    setQuantity(Number(qty));
  }, [product, cartItems]);

  const handleAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!product) return;
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, image: product.images?.[0] ?? product.thumbnail, product, quantity: 1 }));
    setQuantity(1);
  };

  const handleIncrement = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!product) return;
    dispatch(addToCart({ id: product.id, product, quantity: 1 }));
    setQuantity((prev) => Number(prev || 0) + 1);
  };

  const handleDecrement = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!product) return;
    if (quantity <= 1) {
      dispatch(removeFromCart(product.id));
      setQuantity(0);
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity - 1 }));
      setQuantity((prev) => Number(prev) - 1);
    }
  };

  const handleBuyNow = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!product) return;
    if (quantity === 0) {
      dispatch(addToCart({ id: product.id, product, quantity: 1 }));
      setQuantity(1);
    }
    navigate("/checkout");
  };

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [product.thumbnail];
  const currentImage = images[selectedImage] || product.thumbnail;

  return (
    <div className="product-detail-page bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="breadcrumb-nav mb-6">
          <Link to="/products" className="back-link inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Products</span>
          </Link>
        </div>

        <div className="product-container grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="image-gallery flex">
            {images.length > 1 && (
              <div className="thumbnail-gallery gap-3">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`thumbnail-item flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-white transition-all ${selectedImage === index ? "ring-2 ring-blue-500 ring-offset-2" : "ring-1 ring-gray-200 hover:ring-gray-300"}`}
                  >
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            <div className="main-image-wrapper bg-white rounded-3xl p-8 shadow-sm mb-4">
              <div className="main-image-holder aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <LazyImage src={currentImage} alt={product.title} className="main-product-image w-full h-full object-contain" />
              </div>
            </div>
          </div>

          <div className="product-details">
            <div className="brand-stock-section flex items-center justify-between mb-4">
              <div className="brand-info flex items-center gap-2">
                <span className="brand-label text-sm text-gray-500">Brand:</span>
                <span className="brand-name text-lg font-bold text-indigo-600">{product.brand || "N/A"}</span>
              </div>
              <div className={`stock-badge px-4 py-1.5 rounded-full text-sm font-semibold ${product.stock > 20 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {product.stock > 20 ? "In Stock" : `Only ${product.stock} left`}
              </div>
            </div>

            <h1 className="product-main-title text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.title}</h1>

            {product.tags && product.tags.length > 0 && (
              <div className="tags-section mb-4">
                <div className="tags-list flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="tag-pill px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="rating-review-section flex items-center gap-4 mb-4">
              <div className="rating-display flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="rating-value text-sm font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="review-count text-gray-600">({product.reviews?.length || Math.floor(Math.random() * 300) + 50} reviews)</span>
            </div>

            <div className="pricing-section rounded-2xl mb-6">
              <div className="price-row flex items-end gap-4 mb-2">
                <span className="current-price text-3xl font-extrabold text-gray-900">${Number(product.price).toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="original-price text-lg text-gray-500 line-through">${(Number(product.price) / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                    <span className="discount-pill bg-rose-500 text-white px-3 py-1 rounded-lg text-sm font-bold">{product.discountPercentage}% OFF</span>
                  </>
                )}
              </div>
            </div>

            <div className="description-box mb-6">
              <h3 className="section-heading text-lg font-bold text-gray-900 mb-3">About this product</h3>
              <p className="description-text text-gray-700 leading-relaxed">{product.description || "No description available"}</p>
            </div>

            <div className="quantity-picker mb-4">
              <h3 className="section-heading text-lg font-bold text-gray-900 mb-3">Quantity</h3>
              {quantity > 0 ? (
                <div className="quantity-selector flex items-center gap-4">
                  <button onClick={handleDecrement} className="qty-btn minus-btn w-12 h-12 rounded-xl flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 text-xl font-bold hover:bg-gray-50 hover:border-blue-500 transition-all">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="qty-value text-2xl font-bold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                  <button onClick={handleIncrement} className="qty-btn plus-btn w-12 h-12 rounded-xl flex items-center justify-center bg-white border-2 border-gray-300 text-gray-700 text-xl font-bold hover:bg-gray-50 hover:border-blue-500 transition-all">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">Not added to cart yet</p>
              )}
            </div>

            <div className="flex gap-3 items-center">
              {quantity === 0 ? (
                <button onClick={handleAddToCart} className="add-cart-button w-full flex items-center justify-center gap-3 cursor-pointer primary-btn">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm">Add to Cart</span>
                </button>
              ) : (
                <button onClick={handleBuyNow} className="add-cart-button w-full flex items-center justify-center gap-3 cursor-pointer primary-btn">
                  <span className="text-sm">Buy Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
