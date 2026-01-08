import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShieldCheck, CreditCard, Truck } from 'lucide-react';

const CheckoutPage = () => {
    const { cartItems, totalItems, subtotal, discount, total, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePayment = () => {
        // Mock Payment Processing
        setTimeout(() => {
            clearCart();
            setStep(3);
        }, 1500);
    };

    if (cartItems.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-stone-800">Your cart is empty</h2>
                    <button onClick={() => navigate('/shop')} className="mt-4 text-terracotta-600 hover:underline">Continue Shopping</button>
                </div>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream-100 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center border border-stone-100">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <ShieldCheck className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-stone-800 mb-2">Order Confirmed!</h2>
                    <p className="text-stone-500 mb-8">Thank you for supporting our artisans. Your order #ORD-{(Math.random() * 10000).toFixed(0)} has been placed successfully.</p>
                    <button onClick={() => navigate('/')} className="w-full bg-terracotta-600 text-white py-3 rounded-md font-medium hover:bg-terracotta-700 transition-colors">
                        Return to Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-display text-3xl font-bold text-stone-800 mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Forms */}
                <div className="lg:col-span-2">
                    {step === 1 && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center"><Truck className="mr-2" size={20} /> Shipping Address</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">First Name</label>
                                        <input required type="text" className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-terracotta-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Last Name</label>
                                        <input required type="text" className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-terracotta-500 focus:outline-none" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Street Address</label>
                                        <input required type="text" className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-terracotta-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">City</label>
                                        <input required type="text" className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-terracotta-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-1">Pincode</label>
                                        <input required type="text" className="w-full px-3 py-2 border border-stone-200 rounded-md focus:border-terracotta-500 focus:outline-none" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-terracotta-600 text-white py-3 rounded-md font-medium hover:bg-terracotta-700 transition-colors">
                                    Continue to Payment
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                            <h2 className="text-xl font-bold text-stone-800 mb-6 flex items-center"><CreditCard className="mr-2" size={20} /> Payment Method</h2>
                            <div className="space-y-4">
                                <div className="flex items-center p-4 border border-terracotta-500 bg-terracotta-50 rounded-lg cursor-pointer">
                                    <input type="radio" name="payment" defaultChecked className="h-4 w-4 text-terracotta-600 focus:ring-terracotta-500" />
                                    <span className="ml-3 font-medium text-stone-900">Credit / Debit Card</span>
                                </div>
                                <div className="flex items-center p-4 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50">
                                    <input type="radio" name="payment" className="h-4 w-4 text-terracotta-600 focus:ring-terracotta-500" />
                                    <span className="ml-3 font-medium text-stone-900">UPI / Net Banking</span>
                                </div>
                                <div className="flex items-center p-4 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50">
                                    <input type="radio" name="payment" className="h-4 w-4 text-terracotta-600 focus:ring-terracotta-500" />
                                    <span className="ml-3 font-medium text-stone-900">Cash on Delivery</span>
                                </div>
                            </div>
                            <button onClick={handlePayment} className="mt-8 w-full bg-terracotta-600 text-white py-3 rounded-md font-medium hover:bg-terracotta-700 transition-colors">
                                Pay ₹{total.toLocaleString()}
                            </button>
                            <button onClick={() => setStep(1)} className="mt-4 w-full text-stone-500 text-sm hover:underline">
                                Back to Shipping
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-stone-50 p-6 rounded-lg border border-stone-100 sticky top-24">
                        <h3 className="font-bold text-lg text-stone-800 mb-4">Order Summary</h3>
                        <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className={`w-16 h-16 rounded flex-shrink-0 flex items-center justify-center ${(() => {
                                        const colors = [
                                            'bg-red-100 text-red-700',
                                            'bg-blue-100 text-blue-700',
                                            'bg-green-100 text-green-700',
                                            'bg-amber-100 text-amber-700',
                                            'bg-purple-100 text-purple-700',
                                            'bg-pink-100 text-pink-700',
                                            'bg-teal-100 text-teal-700',
                                            'bg-indigo-100 text-indigo-700'
                                        ];
                                        return colors[(item.id || 0) % colors.length];
                                    })()}`}>
                                        <span className="font-display font-bold text-lg opacity-90 tracking-tighter">
                                            {item.name
                                                .split(' ')
                                                .map(word => word[0])
                                                .join('')
                                                .substring(0, 2)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-stone-800 line-clamp-2">{item.name}</p>
                                        <p className="text-xs text-stone-500">Qty: {item.quantity}</p>
                                        <p className="text-sm font-medium text-terracotta-700">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-stone-200 my-4 pt-4 space-y-2">
                            <div className="flex justify-between text-stone-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-600 font-medium">
                                    <span>Discount (10%)</span>
                                    <span>-₹{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-stone-800 font-bold text-lg pt-2 border-t border-stone-200">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="text-xs text-stone-500 flex items-center justify-center mt-4">
                            <ShieldCheck size={14} className="mr-1" /> Secure SSL Encryption
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
