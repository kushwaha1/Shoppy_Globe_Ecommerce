// src/components/CartItem.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import { removeFromCart, updateQuantity } from "../../utils/cartSlice"; // corrected path

function CartItem({ item }) {
  
  const dispatch = useDispatch();

  const inc = () => dispatch(updateQuantity({ id: item.id, quantity: (item.quantity || 1) + 1 }));
  const dec = () => dispatch(updateQuantity({ id: item.id, quantity: Math.max(0, (item.quantity || 1) - 1) }));
  const remove = () => dispatch(removeFromCart(item.id));

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <img src={item.images?.[0]} alt={item.title} className="w-20 h-20 object-cover rounded" />
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{item.title}</div>
        <div className="text-sm text-gray-400">Unit: ${Number(item.price).toFixed(2)}</div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={dec} className="px-2 py-1 border rounded">-</button>
        <div className="w-8 text-center">{item.quantity}</div>
        <button onClick={inc} className="px-2 py-1 border rounded">+</button>
      </div>

      <div className="w-24 text-right font-semibold">${(item.quantity * item.price).toFixed(2)}</div>

      <button onClick={remove} className="ml-3 p-2 rounded hover:bg-red-50">
        <Trash className="w-4 h-4 text-red-500" />
      </button>
    </div>
  );
}

export default CartItem;