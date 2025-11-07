import React from "react";
import { useDispatch } from "react-redux";
import { Trash2, Plus, Minus } from "lucide-react";
import { removeFromCart, updateQuantity } from "../../utils/cartSlice";
import LazyImage from "../LazyImage/LazyImage";

/**
 * CartItem component represents a single product in the shopping cart.
 * Allows incrementing/decrementing quantity, removing the item, and shows the total price.
 * @param {object} item - Cart item object containing product details (id, title, price, quantity, image, etc.)
 */
function CartItem({ item }) {
  const dispatch = useDispatch();

  // -----------------------------
  // Increment quantity by 1
  // -----------------------------
  const handleIncrement = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  // -----------------------------
  // Decrement quantity by 1
  // If quantity becomes 0, remove the item from cart
  // -----------------------------
  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  // -----------------------------
  // Remove the item completely from cart
  // -----------------------------
  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex gap-6">
        {/* -----------------------------
            Product Image
            Uses LazyImage component to optimize loading
        ----------------------------- */}
        <div className="flex-shrink-0">
          <LazyImage
            src={item.image}
            alt={item.title}
            className="w-32 h-32 object-cover rounded-xl bg-gray-100"
          />
        </div>

        {/* -----------------------------
            Product Details Section
            Contains title, price, remove button, quantity controls, and total price
        ----------------------------- */}
        <div className="flex-1 min-w-0">
          {/* Title and Remove Button */}
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500">
                ${Number(item.price).toFixed(2)} each
              </p>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Quantity Controls and Total Price */}
          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              {/* Decrement Button */}
              <button
                onClick={handleDecrement}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Display Current Quantity */}
              <span className="text-lg font-semibold min-w-[3rem] text-center">
                {item.quantity}
              </span>

              {/* Increment Button */}
              <button
                onClick={handleIncrement}
                className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total Price */}
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;