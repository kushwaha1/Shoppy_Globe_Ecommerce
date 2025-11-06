import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    CreditCard,
    Truck,
    ShieldCheck,
    ArrowLeft,
    CheckCircle,
    ShoppingCart,
    AlertTriangle,
} from "lucide-react";
import {
    selectCartItems,
    selectCartSubtotal,
    selectCartCount,
    clearCart,
} from "../../utils/cartSlice";
import "./Checkout.css"
import LazyImage from "../LazyImage/LazyImage";

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const subtotal = useSelector(selectCartSubtotal);
    const totalItems = useSelector(selectCartCount);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        paymentMethod: "card",
    });

    // field-wise errors
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");

    const [popup, setPopup] = useState({ show: false, type: "", message: "" });

    const tax = subtotal * 0.1;
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + tax + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // sanitize some numeric fields
        if (name === "phone") {
            setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }));
        } else if (name === "zipCode") {
            setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }

        // clear the specific field error on change
        setErrors((prev) => {
            if (!prev || !prev[name]) return prev;
            const next = { ...prev };
            delete next[name];
            return next;
        });

        // clear generalError if any
        if (generalError) setGeneralError("");
    };

    // Validate and return object of errors (empty object = no errors)
    const buildValidationErrors = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!formData.firstName || !formData.firstName.trim()) newErrors.firstName = "Please enter your first name.";
        if (!formData.lastName || !formData.lastName.trim()) newErrors.lastName = "Please enter your last name.";
        if (!formData.email || !emailRegex.test(formData.email)) newErrors.email = "Please enter a valid email address.";
        if (!formData.phone || !phoneRegex.test(formData.phone)) newErrors.phone = "Please enter a 10 digit phone number.";
        if (!formData.address || !formData.address.trim()) newErrors.address = "Please enter your address.";
        if (!formData.city || !formData.city.trim()) newErrors.city = "Please enter your city.";
        if (!formData.state || !formData.state.trim()) newErrors.state = "Please enter your state.";
        if (!formData.zipCode || !formData.zipCode.trim()) newErrors.zipCode = "Please enter your ZIP code.";

        // payment method required
        if (!formData.paymentMethod) newErrors.paymentMethod = "Please select a payment method.";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = buildValidationErrors();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setGeneralError("Please fix the highlighted errors.");
            setPopup({ show: true, type: "error", message: "Please fix the highlighted errors." });
            // keep popup closable by user (we auto-hide too)
            setTimeout(() => setPopup((p) => ({ ...p, show: false })), 3000);
            return;
        }

        // no errors -> proceed
        setErrors({});
        setGeneralError("");
        setPopup({ show: true, type: "success", message: "Order Placed Successfully!" });

        // clear cart in redux
        dispatch(clearCart());

        // redirect after short delay
        setTimeout(() => {
            setPopup({ show: false, type: "", message: "" });
            navigate("/");
        }, 3000);
    };

    if (cartItems.length === 0 && !popup.show) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Continue Shopping</span>
                        </Link>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-gray-600 mb-6">Add some products to get started!</p>
                        <button
                            onClick={() => navigate("/products")}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
                        >
                            Browse Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Popup */}
            {popup.show && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm relative animate-fadeIn">
                        {/* ❌ Close button */}
                        <button
                            type="button"
                            onClick={() => setPopup({ show: false, type: "", message: "" })}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                        >
                            ✕
                        </button>

                        {popup.type === "success" ? (
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                        ) : (
                            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
                        )}

                        <h2
                            className={`text-2xl font-bold ${popup.type === "success" ? "text-green-600" : "text-red-600"
                                } mb-2`}
                        >
                            {popup.type === "success" ? "Success" : "Validation Error"}
                        </h2>

                        <p className="text-gray-700 mb-4">{popup.message}</p>

                        {popup.type === "success" && (
                            <div className="text-sm text-gray-500">Redirecting to home page...</div>
                        )}
                    </div>
                </div>
            )}


            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <button
                            onClick={() => navigate("/cart")}
                            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-medium">Back to Cart</span>
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Left Column - Forms */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Shipping */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <Truck className="w-6 h-6 text-blue-600" />
                                        <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">
                                                First Name
                                            </label>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.firstName ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">
                                                Last Name
                                            </label>
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.lastName ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">Phone</label>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.phone ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">Address</label>
                                            <input
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.address ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">City</label>
                                            <input
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.city ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">State</label>
                                            <input
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.state ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2 required">ZIP Code</label>
                                            <input
                                                name="zipCode"
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.zipCode ? "border border-red-500" : "border border-gray-300"}`}
                                            />
                                            {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method - dropdown + conditional fields */}
                                <div className="bg-white rounded-2xl shadow-sm p-6">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CreditCard className="w-6 h-6 text-green-600" />
                                        <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Choose Payment</label>
                                        <select
                                            name="paymentMethod"
                                            value={formData.paymentMethod}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${errors.paymentMethod ? "border border-red-500" : "border border-gray-300"}`}
                                        >
                                            <option value="card">Credit / Debit Card</option>
                                            <option value="upi">UPI</option>
                                            <option value="cod">Cash on Delivery</option>
                                        </select>
                                        {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                    <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                        {cartItems.map((item) => (
                                            <div key={item.id} className="flex gap-3">
                                                <LazyImage
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm font-semibold text-gray-900 truncate">{item.title}</h4>
                                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3 border-t pt-4 mb-6">
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
                                            <span className="font-semibold">{shipping === 0 ? <span className="text-green-600">FREE</span> : `$${shipping.toFixed(2)}`}</span>
                                        </div>

                                        <div className="border-t pt-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">Total</span>
                                                <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Show general error above button if present */}
                                    {generalError && <p className="text-red-500 mb-3 text-sm">{generalError}</p>}

                                    <button
                                        type="submit"
                                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                                    >
                                        Place Order
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <ShieldCheck className="w-4 h-4 text-green-600" />
                                        <span>Secure checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Checkout;