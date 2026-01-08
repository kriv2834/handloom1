import React, { useState } from 'react';
import { ShoppingBag, Star, Heart, Eye, Clock, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import RippleButton from './RippleButton';

const ProductCard = ({ product, onQuickView }) => { // Added onQuickView prop
    const { addToCart } = useCart();
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Mock social proof number
    const views = (product.id * 12) % 40 + 10;

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
        return colors[id % colors.length];
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-stone-100 group relative"
        >
            <div className="relative h-72 overflow-hidden bg-stone-100">
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <div className={`w-full h-full flex items-center justify-center ${getPlaceholderColor(product.id || 0)}`}>
                        <span className="font-display font-bold text-6xl opacity-90 tracking-tighter">
                            {getInitials(product.name)}
                        </span>
                    </div>
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <div className="bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-stone-900 uppercase tracking-widest border border-stone-100 shadow-sm">
                        {product.category}
                    </div>
                    {product.id % 2 === 0 && (
                        <div className="bg-lime-100/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-lime-800 uppercase tracking-widest shadow-sm flex items-center gap-1">
                            <Truck size={10} /> 7-Day Del
                        </div>
                    )}
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-10 shadow-sm ${isWishlisted ? 'bg-terracotta-50 text-terracotta-600' : 'bg-white/80 text-stone-400 hover:bg-white hover:text-terracotta-500'
                        }`}
                >
                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>

                {/* Quick View & Actions Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                    <div className="pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <button
                            onClick={(e) => { e.preventDefault(); onQuickView && onQuickView(product) }}
                            className="bg-white text-stone-900 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors shadow-lg flex items-center gap-2"
                        >
                            <Eye size={14} /> Quick View
                        </button>
                    </div>
                </div>

                {/* Bottom Info on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-stone-900/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-between items-end">
                        <div className="text-xs font-medium">
                            <p className="text-stone-100/90 shadow-sm">Woven by</p>
                            <p className="font-display font-bold text-lg leading-none shadow-sm">{product.artisan}</p>
                        </div>
                        <div className="text-[10px] bg-black/50 px-2 py-1 rounded-full backdrop-blur-md">
                            {views} people viewing
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product.id}`} className="group-hover:text-terracotta-700 transition-colors">
                        <h3 className="font-display text-lg font-bold text-stone-800 line-clamp-1">{product.name}</h3>
                    </Link>
                    <div className="flex flex-col items-end">
                        <span className="font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                        {product.id % 3 === 0 && <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 rounded">10% OFF</span>}
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center text-amber-400 text-xs font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-100">
                        <Star size={10} fill="currentColor" className="mr-1" /> 4.8
                    </div>
                    <div className="flex items-center text-stone-400 text-xs">
                        <span className="w-1 h-1 bg-stone-300 rounded-full mr-2"></span>
                        {product.material}
                    </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="text-xs text-stone-500 flex items-center gap-1">
                        <Clock size={12} /> Made to order
                    </div>
                    <RippleButton
                        onClick={() => addToCart(product)}
                        className="bg-stone-900 hover:bg-terracotta-600 text-white p-2.5 rounded-full shadow-lg hover:shadow-terracotta-200 transition-all active:scale-95"
                        title="Add to Cart"
                    >
                        <ShoppingBag size={18} />
                    </RippleButton>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
