import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, removeFromCart, total, subtotal, discount, isPrepaid, setIsPrepaid } = useCart();

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const getPlaceholderColor = (id) => {
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
        return colors[(id || 0) % colors.length];
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center">
                <h2 className="font-display text-2xl text-stone-800 mb-4">Your bag is empty</h2>
                <Link to="/shop" className="bg-terracotta-600 text-white px-6 py-2 rounded-md hover:bg-terracotta-700 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="font-display text-3xl font-bold text-stone-800 mb-8">Shopping Bag</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                            <div className={`w-24 h-24 rounded-md flex-shrink-0 flex items-center justify-center ${getPlaceholderColor(item.id)}`}>
                                <span className="font-display font-bold text-2xl opacity-90 tracking-tighter">
                                    {getInitials(item.name)}
                                </span>
                            </div>
                            <div className="ml-4 flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-serif font-bold text-stone-800">{item.name}</h3>
                                    <button onClick={() => removeFromCart(item.id)} className="text-stone-400 hover:text-red-500">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <p className="text-sm text-stone-500 mb-2">{item.material}</p>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-sm text-stone-600">Qty: {item.quantity}</span>
                                    <span className="font-bold text-stone-900">₹{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 h-fit">
                    <h3 className="font-display text-xl font-bold text-stone-800 mb-6">Order Summary</h3>

                    <div className="space-y-3 mb-6 border-b border-stone-100 pb-6">
                        <div className="flex justify-between text-stone-600">
                            <span>Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between items-center text-stone-600">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isPrepaid}
                                    onChange={(e) => setIsPrepaid(e.target.checked)}
                                    className="mr-2 accent-terracotta-600 w-4 h-4"
                                />
                                <span className="text-sm">Prepaid Order (10% Off)</span>
                            </label>
                            <span className="text-green-600">- ₹{discount.toLocaleString()}</span>
                        </div>

                        <div className="flex justify-between text-stone-600">
                            <span>Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>
                    </div>

                    <div className="flex justify-between font-bold text-lg text-stone-900 mb-6">
                        <span>Total</span>
                        <span>₹{total.toLocaleString()}</span>
                    </div>

                    <Link
                        to="/checkout"
                        className="block w-full bg-terracotta-600 text-white text-center py-3 rounded-md font-medium hover:bg-terracotta-700 transition-colors shadow-lg shadow-terracotta-600/20"
                    >
                        Proceed to Checkout
                    </Link>

                    <div className="flex items-center justify-center text-xs text-stone-500">
                        <ShieldCheck size={14} className="mr-1 text-green-600" />
                        Secure Checkout • Authentic Handloom
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
