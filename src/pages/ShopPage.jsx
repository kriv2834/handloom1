import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ui/ProductCard';
import QuickViewModal from '../components/ui/QuickViewModal';
import { useProducts } from '../context/ProductContext';
import { Search, Filter, Leaf, ChevronDown } from 'lucide-react';

const ShopPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null); // Modal State
    const [sortBy, setSortBy] = useState('newest');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: 'All',
        feel: 'All',
        occasion: 'All',
        region: 'All'
    });
    const [priceRange, setPriceRange] = useState(20000);
    const { products, loading } = useProducts();

    const collectionStories = {
        'All': "Handpicked weaves from the heart of India.",
        'Saree': "Six yards of sheer elegance, woven with stories of culture and grace.",
        'Shawl': "Warmth wrapped in heritage. The finest wools from the valleys of Kashmir.",
        'Apparel': "Contemporary silhouettes, timeless fabric. Wear the legacy.",
        'Home Decor': "Bring the soul of India into your living space.",
        'Accessories': "Small pieces of art to carry with you everyday."
    };

    const filterGroups = {
        explore: ['All', 'Saree', 'Shawl', 'Apparel', 'Home Decor', 'Accessories'],
        feel: ['All', 'Soft', 'Crisp', 'Heavy', 'Flowing'],
        occasion: ['All', 'Daily', 'Festive', 'Gifting'],
        region: ['All', 'Gujarat', 'Odisha', 'Bengal', 'Kashmir', 'Telangana']
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };


    // Loading State
    if (loading) {
        return (
            <div className="min-h-screen bg-stone-50 flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-terracotta-200 border-t-terracotta-600 rounded-full animate-spin"></div>
                    <p className="text-stone-500 font-serif italic">Curating the finest weaves...</p>
                </div>
            </div>
        );
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.material.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filters.category === 'All' || product.category === filters.category;
        const matchesPrice = Number(product.price) <= priceRange; // Ensure numeric comparison
        return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
        if (sortBy === 'price-low') return Number(a.price) - Number(b.price);
        if (sortBy === 'price-high') return Number(b.price) - Number(a.price);
        return 0; // 'newest' uses default order (assuming data is somewhat ordered or random)
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-stone-50 bg-noise">
            {/* Header Banner */}
            <div className="bg-white border-b border-stone-100 py-16 px-4 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 font-display text-[12rem] leading-none -translate-y-10 translate-x-10 pointer-events-none text-terracotta-200">
                    Art
                </div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="font-display text-5xl font-bold text-stone-900 mb-4">{filters.category === 'All' ? 'Curated Looms' : filters.category}</h1>
                    <p className="text-stone-500 max-w-xl text-lg font-light leading-relaxed">
                        {collectionStories[filters.category] || "Each piece tells a story of tradition, skill, and timeless beauty."}
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sidebar Filters - Sticky */}
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <div className="sticky top-32 space-y-10">

                            {/* Search */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Find your weave..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-full text-sm focus:outline-none focus:border-terracotta-500 focus:ring-1 focus:ring-terracotta-200 transition-all shadow-sm"
                                />
                                <Search size={18} className="absolute left-3 top-3.5 text-stone-400" />
                            </div>

                            {/* Filter Groups */}
                            <div className="space-y-8">
                                <div>
                                    <h4 className="font-serif font-bold text-stone-900 mb-4 flex items-center gap-2">
                                        <Leaf size={16} className="text-terracotta-600" /> Explore By
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {filterGroups.explore.map(item => (
                                            <button
                                                key={item}
                                                onClick={() => handleFilterChange('category', item)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filters.category === item
                                                    ? 'bg-stone-900 text-white shadow-lg transform -translate-y-0.5'
                                                    : 'bg-white text-stone-500 border border-stone-200 hover:border-stone-800 hover:text-stone-800'
                                                    }`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Mock Filters for Visuals */}
                                {['feel', 'occasion', 'region'].map(filterKey => (
                                    <div key={filterKey}>
                                        <h4 className="font-serif font-bold text-stone-900 mb-4 capitalize">{filterKey === 'feel' ? 'Fabric Feel' : filterKey}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {filterGroups[filterKey].map(item => (
                                                <button
                                                    key={item}
                                                    onClick={() => handleFilterChange(filterKey, item)}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filters[filterKey] === item
                                                        ? 'bg-terracotta-100 text-terracotta-800 border-terracotta-200'
                                                        : 'text-stone-500 hover:text-terracotta-600'
                                                        }`}
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Price Range */}
                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-serif font-bold text-stone-900">Price</h4>
                                        <span className="text-xs font-bold text-stone-900">Max: ₹{priceRange.toLocaleString()}</span>
                                    </div>

                                    <input
                                        type="range"
                                        min="500"
                                        max="20000"
                                        step="500"
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(Number(e.target.value))}
                                        className="w-full accent-stone-900 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="mb-8 flex flex-col sm:flex-row items-end sm:items-center justify-between border-b border-stone-200 pb-4 gap-4">
                            <h2 className="font-display text-3xl font-bold text-stone-900">
                                {filters.category === 'All' ? 'All Weaves' : filters.category}
                            </h2>
                            <div className="flex items-center gap-4 relative z-20">
                                <div className="relative">
                                    <button
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
                                        className="flex items-center gap-2 text-sm font-bold text-stone-600 hover:text-terracotta-600 transition-colors px-4 py-2 rounded-full hover:bg-stone-100/50"
                                    >
                                        {sortBy === 'newest' && 'Newest First'}
                                        {sortBy === 'price-low' && 'Price: Low to High'}
                                        {sortBy === 'price-high' && 'Price: High to Low'}
                                        <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    <AnimatePresence>
                                        {isSortOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 top-full mt-2 w-48 bg-white/80 backdrop-blur-xl border border-white/50 shadow-xl rounded-xl overflow-hidden p-1"
                                            >
                                                {[
                                                    { label: 'Newest First', value: 'newest' },
                                                    { label: 'Price: Low to High', value: 'price-low' },
                                                    { label: 'Price: High to Low', value: 'price-high' }
                                                ].map(option => (
                                                    <button
                                                        key={option.value}
                                                        onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                                                        className={`w-full text-left px-4 py-2.5 text-xs font-bold rounded-lg transition-colors ${sortBy === option.value
                                                            ? 'bg-terracotta-50 text-terracotta-600'
                                                            : 'text-stone-600 hover:bg-stone-50'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <span className="text-stone-400 text-sm font-mono">{filteredProducts.length} Results</span>
                            </div>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {filteredProducts.map(product => (
                                    <motion.div key={product.id} variants={itemVariants}>
                                        <ProductCard product={product} onQuickView={setSelectedProduct} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="relative py-32 rounded-3xl overflow-hidden text-center"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1608226068305-6504a557b781?q=80&w=1587&auto=format&fit=crop"
                                    className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
                                    alt="Empty State Background"
                                />
                                <div className="absolute inset-0 bg-stone-50/80 backdrop-blur-sm"></div>

                                <div className="relative z-10 max-w-md mx-auto px-4">
                                    <Leaf className="mx-auto text-terracotta-400 mb-6 opacity-50" size={48} />
                                    <h3 className="font-display text-3xl font-bold text-stone-800 mb-4">Every weave takes time.</h3>
                                    <p className="text-stone-600 font-serif italic text-lg mb-8">
                                        "This space will soon hold a story. The artisans are just finishing up."
                                    </p>
                                    <button onClick={() => { setSearchTerm(''); setFilters({ category: 'All', feel: 'All', occasion: 'All', region: 'All' }); setPriceRange(20000) }} className="text-stone-900 font-bold border-b-2 border-terracotta-400 hover:text-terracotta-600 transition-colors uppercase tracking-widest text-xs py-1">
                                        Meet Our Artisans Instead
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* Quick View Modal */}
                    <QuickViewModal
                        product={selectedProduct}
                        isOpen={!!selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />

                    {/* Mobile Sticky Action Bar */}
                    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 p-4 flex justify-between items-center z-40 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="flex items-center gap-2 text-stone-800 font-bold text-sm"
                        >
                            <Filter size={16} /> Filter
                        </button>
                        <div className="w-px h-6 bg-stone-200"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-stone-500 font-medium">Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-sm font-bold text-stone-800 border-none focus:ring-0 p-0"
                            >
                                <option value="newest">Newest</option>
                                <option value="price-low">Low to High</option>
                                <option value="price-high">High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
