import React, { useState } from 'react';
import { Package, User, MapPin, ChevronRight, Clock, CheckCircle, Heart, Key, Edit2, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const UserDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');

    // Mock Data
    const orders = [
        { id: '#ORD-7721', date: 'Oct 24, 2025', total: 12500, status: 'Delivered', items: 'Banarasi Silk Saree x1', color: 'green' },
        { id: '#ORD-7722', date: 'Nov 02, 2025', total: 4500, status: 'Shipped', items: 'Cotton Ikat Saree x1', color: 'blue' },
    ];

    const wishlist = [
        { id: 1, name: 'Handwoven Kanchipuram Silk', price: 18000, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80' },
        { id: 2, name: 'Pure Pashmina Shawl', price: 12500, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&q=80' },
    ];

    const addresses = [
        { id: 1, type: 'Home', name: user?.name, street: '123 Silk Road, Handloom Nagar', city: 'Varanasi', state: 'Uttar Pradesh', zip: '221001', phone: '+91 98765 43210', isDefault: true },
        { id: 2, type: 'Work', name: user?.name, street: '45 Corporate Park', city: 'Lucknow', state: 'Uttar Pradesh', zip: '226010', phone: '+91 98765 43210', isDefault: false },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-stone-50">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4"
            >
                <div>
                    <h1 className="font-display text-4xl font-bold text-stone-800">My Account</h1>
                    <p className="text-stone-500 mt-2 text-lg">Welcome back, <span className="text-terracotta-600 font-semibold">{user?.name}</span></p>
                </div>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
                {/* Sidebar Profile Info */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6">
                    <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 overflow-hidden relative">
                        {/* Decorative Background Pattern */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-terracotta-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>

                        <div className="flex items-center space-x-4 mb-8 relative z-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-terracotta-100 to-terracotta-200 rounded-full flex items-center justify-center text-terracotta-700 font-bold text-2xl shadow-inner border border-white">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-800 text-lg">{user?.name}</h3>
                                <p className="text-sm text-stone-500 truncate w-32">{user?.email}</p>
                            </div>
                        </div>
                        <nav className="space-y-2 relative z-10">
                            {[
                                { id: 'orders', icon: Package, label: 'My Orders' },
                                { id: 'wishlist', icon: Heart, label: 'Wishlist' },
                                { id: 'addresses', icon: MapPin, label: 'Addresses' },
                                { id: 'profile', icon: User, label: 'Profile Details' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all shadow-sm group ${activeTab === item.id
                                        ? 'bg-terracotta-50 text-terracotta-700 font-medium'
                                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                                        }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <item.icon size={20} className={activeTab === item.id ? "text-terracotta-600" : "text-stone-400 group-hover:text-stone-600"} />
                                        <span>{item.label}</span>
                                    </div>
                                    <ChevronRight size={16} className={`transition-transform ${activeTab === item.id ? "text-terracotta-400" : "text-stone-300 group-hover:text-stone-400"}`} />
                                </button>
                            ))}
                        </nav>
                    </motion.div>
                </div>

                {/* Main Content Areas */}
                <div className="md:col-span-8 lg:col-span-9 space-y-6">
                    <AnimatePresence mode="wait">
                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-2xl font-bold text-stone-800">Recent Orders</h2>
                                    <button className="text-terracotta-600 text-sm font-medium hover:underline">View All</button>
                                </div>

                                <div className="space-y-4">
                                    {orders.map((order) => (
                                        <motion.div
                                            key={order.id}
                                            variants={itemVariants}
                                            className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-md transition-shadow group"
                                        >
                                            <div className="space-y-2 mb-4 sm:mb-0">
                                                <div className="flex items-center space-x-3">
                                                    <span className="font-bold text-stone-800 text-lg group-hover:text-terracotta-600 transition-colors">{order.id}</span>
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                                        {order.status === 'Delivered' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-stone-500">
                                                    <span>{order.date}</span>
                                                    <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                                                    <span className="font-semibold text-stone-700">₹{order.total.toLocaleString()}</span>
                                                </div>
                                                <p className="text-sm text-stone-700 font-medium bg-stone-50 inline-block px-2 py-1 rounded-md mt-1">{order.items}</p>
                                            </div>
                                            <button className="px-5 py-2.5 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-900 hover:text-white hover:border-stone-900 text-sm font-medium transition-all duration-200">
                                                View Details
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'wishlist' && (
                            <motion.div
                                key="wishlist"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <h2 className="font-display text-2xl font-bold text-stone-800 mb-6">My Wishlist</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {wishlist.map((item) => (
                                        <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-lg transition-all group">
                                            <div className="relative h-64 overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-lg text-stone-800 mb-1">{item.name}</h3>
                                                <p className="text-terracotta-600 font-bold font-mono">₹{item.price.toLocaleString()}</p>
                                                <button className="w-full mt-4 bg-stone-900 text-white py-2.5 rounded-xl font-medium hover:bg-stone-800 transition-colors">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'addresses' && (
                            <motion.div
                                key="addresses"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="font-display text-2xl font-bold text-stone-800">Saved Addresses</h2>
                                    <button className="flex items-center gap-2 text-terracotta-600 font-bold hover:bg-terracotta-50 px-4 py-2 rounded-lg transition-colors">
                                        <Plus size={18} /> Add New
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {addresses.map((addr) => (
                                        <div key={addr.id} className={`bg-white p-6 rounded-2xl border-2 transition-all relative ${addr.isDefault ? 'border-terracotta-100 shadow-md ring-1 ring-terracotta-100' : 'border-stone-100 hover:border-stone-200'}`}>
                                            {addr.isDefault && (
                                                <span className="absolute top-4 right-4 bg-terracotta-100 text-terracotta-700 text-xs font-bold px-2 py-1 rounded-full">Default</span>
                                            )}
                                            <div className="flex items-center gap-2 mb-4">
                                                <MapPin className="text-stone-400" size={20} />
                                                <span className="font-bold text-stone-800 text-lg">{addr.type}</span>
                                            </div>
                                            <div className="space-y-1 text-stone-600 text-sm mb-6">
                                                <p className="font-medium text-stone-800">{addr.name}</p>
                                                <p>{addr.street}</p>
                                                <p>{addr.city}, {addr.state} - {addr.zip}</p>
                                                <p className="pt-2">Mobile: <span className="font-mono text-stone-700">{addr.phone}</span></p>
                                            </div>
                                            <div className="flex gap-3 pt-4 border-t border-stone-50">
                                                <button className="flex-1 py-2 text-stone-600 font-medium hover:bg-stone-50 rounded-lg transition-colors">Edit</button>
                                                <button className="flex-1 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors">Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 max-w-2xl"
                            >
                                <h2 className="font-display text-2xl font-bold text-stone-800 mb-8">Profile Details</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                                            <input type="text" defaultValue={user?.name.split(' ')[0]} className="w-full px-4 py-3 bg-stone-50 border-stone-200 border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                                            <input type="text" defaultValue={user?.name.split(' ')[1] || ''} className="w-full px-4 py-3 bg-stone-50 border-stone-200 border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 transition-all" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                                        <input type="email" defaultValue={user?.email} disabled className="w-full px-4 py-3 bg-stone-100 border-stone-200 border rounded-xl text-stone-500 cursor-not-allowed" />
                                        <p className="text-xs text-stone-400 mt-1 flex items-center gap-1"><Key size={12} /> Email cannot be changed</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                                        <input type="tel" placeholder="+91" className="w-full px-4 py-3 bg-stone-50 border-stone-200 border rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-100 focus:border-terracotta-400 transition-all" />
                                    </div>
                                    <div className="pt-4 flex justify-end">
                                        <button type="button" className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                                            <Edit2 size={18} /> Update Profile
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default UserDashboard;
