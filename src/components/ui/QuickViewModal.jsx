import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Star, Share2, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import RippleButton from './RippleButton';

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();

    if (!isOpen || !product) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-50 w-full max-w-4xl h-fit max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors"
                        >
                            <X size={20} className="text-stone-800" />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 bg-stone-100 relative h-64 md:h-auto overflow-hidden">
                            <div className={`w-full h-full flex items-center justify-center ${(() => {
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
                                return colors[(product.id || 0) % colors.length];
                            })()}`}>
                                <span className="font-display font-bold text-9xl opacity-90 tracking-tighter">
                                    {product.name
                                        .split(' ')
                                        .map(word => word[0])
                                        .join('')
                                        .substring(0, 2)
                                        .toUpperCase()}
                                </span>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-800 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> In Stock
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-terracotta-50 text-terracotta-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
                                <span className="flex items-center text-amber-400 text-xs font-bold">
                                    <Star size={12} fill="currentColor" className="mr-1" /> 4.8
                                </span>
                            </div>

                            <h2 className="font-display text-3xl font-bold text-stone-900 mb-2">{product.name}</h2>
                            <p className="text-stone-500 text-sm mb-6 font-medium">Crafted by <span className="text-stone-800 underline decoration-terracotta-300">{product.artisan}</span></p>

                            <div className="flex items-baseline gap-3 mb-6">
                                <span className="text-3xl font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                                <span className="text-sm text-stone-400 line-through">₹{(product.price * 1.2).toLocaleString()}</span>
                            </div>

                            <p className="text-stone-600 font-serif italic mb-8 border-l-2 border-terracotta-200 pl-4 py-1">
                                "{product.description || "A masterpiece of tradition, woven with patience and prayer."}"
                            </p>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 text-xs text-stone-600 border border-stone-100 p-3 rounded-lg bg-stone-50/50">
                                    <ShieldCheck className="text-green-600" size={18} />
                                    <div>
                                        <p className="font-bold text-stone-800">Authentic</p>
                                        <p className="text-[10px]">Verified Handloom</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-stone-600 border border-stone-100 p-3 rounded-lg bg-stone-50/50">
                                    <Truck className="text-stone-600" size={18} />
                                    <div>
                                        <p className="font-bold text-stone-800">Fast Ship</p>
                                        <p className="text-[10px]">Dispatches in 24h</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto space-y-4">
                                <RippleButton
                                    onClick={() => { addToCart(product); onClose(); }}
                                    className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold text-sm shadow-xl hover:bg-terracotta-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={18} /> Add to Wardrobe
                                </RippleButton>
                                <button className="w-full py-3 rounded-xl border border-stone-200 text-stone-600 font-bold text-sm hover:bg-stone-50 transition-colors flex items-center justify-center gap-2">
                                    <Share2 size={16} /> Share with a Friend
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
