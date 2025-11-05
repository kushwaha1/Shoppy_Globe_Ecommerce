// src/components/Cart/CartDropdown.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { selectCartItems, selectCartSubtotal, removeFromCart } from "../../utils/cartSlice";

function CartDropdown({ onClose }) {
  const items = useSelector(selectCartItems) ?? [];e
  const subtotal = useSelector(selectCartSubtotal) ?? 0;
  const dispatch = useDispatch();

  return (
    <div className="absolute right-0 mt-3 w-80 md:w-96 bg-[#071033]/95 backdrop-blur-md border border-[#BFA6A0]/20 rounded-xl shadow-lg z-50">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-white">Your Cart</span>
          <span className="text-sm text-white/60">{items.length} items</span>
        </div>

        {items.length === 0 ? (
          <div className="py-8 text-center text-white/60">Your cart is empty</div>
        ) : (
          <>
            <div className="space-y-3 max-h-56 overflow-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" loading="lazy" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">{item.title}</div>
                    <div className="text-xs text-white/60">{item.quantity} × ${Number(item.price).toFixed(2)}</div>
                  </div>

                  <div className="text-sm font-semibold text-[#BFA6A0]">${(item.quantity * item.price).toFixed(2)}</div>

                  <button onClick={() => dispatch(removeFromCart(item.id))} aria-label="Remove item" className="ml-2 p-1 rounded hover:bg-white/5">
                    <Trash className="w-4 h-4 text-white/70" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-3 border-t border-white/6 pt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white/60">Subtotal</span>
                <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex gap-2">
                <Link to="/cart" onClick={onClose} className="flex-1 text-center px-3 py-2 rounded bg-[#BFA6A0] font-semibold">View Cart</Link>
                <Link to="/checkout" onClick={onClose} className="flex-1 text-center px-3 py-2 rounded border border-white/10 text-sm">Checkout</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartDropdown;