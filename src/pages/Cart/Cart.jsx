import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { 
  clearCart, 
  selectCartItems, 
  selectCartSubtotal, 
  selectCartCount 
} from "../../utils/cartSlice";
import CartItem from "../../components/CartItem/CartItem";

/**
 * Cart Component
 * Displays the user's shopping cart with all selected items.
 * Allows updating quantities, removing items, clearing the cart, and proceeding to checkout.
 */
function Cart() {
  const items = useSelector(selectCartItems);       // Fetch cart items from Redux store
  const subtotal = useSelector(selectCartSubtotal); // Calculate subtotal of cart items
  const totalItems = useSelector(selectCartCount);  // Count total number of items in the cart
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // -----------------------------
  // Tax, shipping, and total calculations
  // -----------------------------
  const tax = subtotal * 0.1;                  // 10% tax
  const shipping = subtotal > 50 ? 0 : 10;     // Free shipping for orders above $50
  const total = subtotal + tax + shipping;     // Total price including tax and shipping

  // -----------------------------
  // Navigate to checkout page
  // -----------------------------
  const handleCheckout = () => navigate("/checkout");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* -----------------------------
            Back to Products Link
        ----------------------------- */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Continue Shopping</span>
          </Link>
        </div>

        {/* -----------------------------
            Empty Cart Message
        ----------------------------- */}
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              Browse Products
            </Link>
          </div>
        ) : (

          /* -----------------------------
              Cart with Items
          ----------------------------- */
          <div className="grid lg:grid-cols-3 gap-8">

            {/* -----------------------------
                Cart Items Section (Left)
            ----------------------------- */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} /> // Render individual cart item
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your cart?")) {
                    dispatch(clearCart());
                  }
                }}
                className="w-full px-4 py-3 border-2 border-red-200 text-red-600 cursor-pointer font-semibold rounded-xl hover:bg-red-50 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            {/* -----------------------------
                Order Summary Section (Right)
            ----------------------------- */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">

                {/* Header */}
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Price Breakdown */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {/* Suggestion to add more for free shipping */}
                  {subtotal < 50 && subtotal > 0 && (
                    <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                      Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                  )}

                  {/* Total Price */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Proceed to Checkout
                </button>

                {/* Footer Note */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Secure checkout • Safe payments</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;