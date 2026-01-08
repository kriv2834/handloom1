import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { getProductById } = useProducts();
    const product = getProductById(id);

    if (!product) {
        return <div className="p-20 text-center text-stone-500 text-xl font-display">Product not found...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-stone-50 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-12"
            >
                {/* Product Image with Zoom */}
                <div className="w-full md:w-1/2 sticky top-24 h-fit">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="rounded-3xl overflow-hidden shadow-2xl shadow-stone-200 border border-white relative group cursor-zoom-in aspect-[3/4]"
                    >
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
                            <span className="font-display font-bold text-[10rem] md:text-[14rem] opacity-90 tracking-tighter">
                                {product.name
                                    .split(' ')
                                    .map(word => word[0])
                                    .join('')
                                    .substring(0, 2)
                                    .toUpperCase()}
                            </span>
                        </div>
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                            View Details
                        </div>
                    </motion.div>

                    {/* Fabric Feel Indicator */}
                    <div className="mt-8 bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                        <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-terracotta-500"></span> Fabric Feel
                        </h3>
                        <div className="relative pt-6 pb-2">
                            <div className="h-1 bg-stone-200 rounded-full w-full"></div>
                            <div className="flex justify-between text-[10px] uppercase font-bold text-stone-400 mt-3 tracking-wider">
                                <span>Soft</span>
                                <span>Crisp</span>
                                <span>Heavy</span>
                                <span>Flowing</span>
                            </div>
                            {/* Mock Indicator Position */}
                            <motion.div
                                initial={{ left: "0%" }}
                                animate={{ left: "30%" }}
                                transition={{ delay: 1, type: "spring" }}
                                className="absolute top-4 w-4 h-4 bg-stone-900 border-2 border-white rounded-full shadow-md -translate-x-1/2"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] px-2 py-1 rounded animate-bounce whitespace-nowrap">
                                    You are here
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Product Details */}
                <div className="w-full md:w-1/2 space-y-8">
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-terracotta-600 font-bold text-xs tracking-[0.2em] uppercase bg-terracotta-50 px-3 py-1 rounded-full">{product.category}</span>
                            <span className="text-stone-400 text-xs font-mono">ID: {product.id}AFX</span>
                        </div>
                        <h1 className="font-display text-5xl md:text-6xl font-bold text-stone-900 mb-4 leading-[0.9]">{product.name}</h1>

                        <div className="flex items-center gap-4 text-sm text-stone-500 border-b border-stone-100 pb-6">
                            <span className="flex items-center text-stone-900 font-bold">
                                <Star size={16} fill="black" className="mr-1" /> 4.8 <span className="text-stone-400 font-normal ml-1">(128 reviews)</span>
                            </span>
                            <span className="w-px h-4 bg-stone-300"></span>
                            <span>Crafted by <Link to="#" className="font-bold text-terracotta-700 underline decoration-terracotta-200 hover:decoration-terracotta-600 transition-all">{product.artisan}</Link></span>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-4xl font-bold text-stone-900 font-display flex items-baseline gap-2">
                        ₹{product.price.toLocaleString()}
                        <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">-15% with WHEEL</span>
                    </motion.div>

                    {/* Impact Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-stone-900 text-white p-6 rounded-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/20 rounded-full blur-[50px]"></div>
                        <h4 className="font-display text-xl font-bold mb-2 flex items-center gap-2">
                            <ShieldCheck size={20} className="text-lime-400" /> Direct Impact
                        </h4>
                        <p className="text-stone-300 text-sm leading-relaxed mb-4">
                            Your purchase of <strong>₹{product.price.toLocaleString()}</strong> directly supports {product.artisan}'s family in Varanasi. We transfer 78% of proceeds immediately upon shipment.
                        </p>
                        <div className="flex items-center gap-3 text-xs font-bold text-lime-400 uppercase tracking-widest">
                            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span> Verified Fair Wage
                        </div>
                    </motion.div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-stone-900">The Story</h3>
                        <p className="text-stone-600 leading-relaxed text-lg font-serif italic">
                            "{product.description} This piece whispers stories of the loom. Handcrafted using traditional <span className="font-semibold text-stone-800">{product.material}</span> weaving techniques that refuse to be forgotten."
                        </p>
                    </div>

                    {/* Care Icons */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-stone-100">
                        {[{ icon: "💧", label: "Hand Wash" }, { icon: "☀️", label: "Dry in Shade" }, { icon: "💨", label: "Airy Storage" }].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{item.icon}</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{item.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={() => addToCart(product)}
                            className="w-full bg-stone-900 text-white py-5 rounded-full font-bold text-xl hover:bg-terracotta-600 transition-all active:scale-95 shadow-xl hover:shadow-2xl hover:shadow-terracotta-200 flex items-center justify-center gap-3 relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <ShoppingBag size={24} /> Add to Wardrobe
                            </span>
                        </button>
                        <p className="text-center text-xs text-stone-400 mt-4 flex items-center justify-center gap-1">
                            <Truck size={12} /> Free shipping on orders above ₹999
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
export default ProductDetailPage;

