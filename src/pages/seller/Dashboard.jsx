
import React, { useState } from 'react';
import { BarChart3, Package, Upload, Plus, Trash2, Edit, Search, Filter, ArrowUpRight, ShoppingCart, Settings, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 2000 },
    { name: 'Apr', sales: 2780 },
    { name: 'May', sales: 1890 },
    { name: 'Jun', sales: 2390 },
    { name: 'Jul', sales: 3490 },
];

const SellerDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { user } = useAuth();
    const { products, addProduct, deleteProduct, loading } = useProducts();
    const [inventorySearch, setInventorySearch] = useState('');

    // Form State
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: 'Saree',
        material: '',
        description: '',
        image: null
    });

    const mockOrders = [
        { id: '#ORD-9901', customer: 'Aarav Patel', date: 'Today, 2:30 PM', total: 18500, status: 'Pending', items: 'Kanchipuram Silk Saree x1' },
        { id: '#ORD-9842', customer: 'Priya Sharma', date: 'Yesterday', total: 4200, status: 'Shipped', items: 'Cotton Handloom Scarf x2' },
        { id: '#ORD-9800', customer: 'John Doe', date: 'Oct 22, 2025', total: 22000, status: 'Delivered', items: 'Banarasi Brocade Saree x1' },
    ];

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to remove this product?')) {
            deleteProduct(id);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) { // 5MB limit
                alert("File size should be less than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Create product object
        const productToAdd = {
            ...newProduct,
            price: Number(newProduct.price),
            image: newProduct.image || "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=600&auto=format&fit=crop",
            artisan: user ? user.name : "Artisan"
        };
        await addProduct(productToAdd);
        alert('Product added successfully!');
        setNewProduct({ name: '', price: '', category: 'Saree', material: '', description: '', image: null });
        setActiveTab('products');
    };

    const filteredInventory = products.filter(p =>
        p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
        p.category.toLowerCase().includes(inventorySearch.toLowerCase())
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-stone-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="font-display text-4xl font-bold text-stone-800">Seller Dashboard</h1>
                    <p className="text-stone-500 mt-2">Manage your handloom collections and track performance</p>
                </motion.div>
                {user && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-full shadow-sm border border-stone-200">
                        <div className="w-10 h-10 bg-gradient-to-br from-terracotta-400 to-terracotta-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                            {user.name.charAt(0)}
                        </div>
                        <div className="text-right hidden sm:block">
                            <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Logged in as</p>
                            <p className="font-bold text-stone-800 text-sm">{user.name}</p>
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-64 bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-fit sticky top-24 z-10">
                    <nav className="space-y-2">
                        {[
                            { id: 'overview', label: 'Overview', icon: BarChart3 },
                            { id: 'orders', label: 'Orders', icon: ShoppingCart },
                            { id: 'products', label: 'My Inventory', icon: Package },
                            { id: 'upload', label: 'Add Product', icon: Plus },
                            { id: 'settings', label: 'Settings', icon: Settings },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 font-medium ${activeTab === item.id
                                    ? 'bg-stone-900 text-white shadow-lg shadow-stone-200'
                                    : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                                    }`}
                            >
                                <item.icon size={20} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="mt-8 pt-8 border-t border-stone-100">
                        <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-4">Storage Status</p>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-stone-600 font-medium">Used Space</span>
                                <span className="font-bold text-stone-800">45%</span>
                            </div>
                            <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "45%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { title: 'Total Revenue', value: '₹45,200', change: '+12%', note: 'from last month' },
                                        { title: 'Total Orders', value: '24', change: '+4', note: 'new this week' },
                                        { title: 'Active Listings', value: products.length, change: null, note: 'Maximum limit: 50' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow group">
                                            <h3 className="text-stone-500 text-sm font-medium mb-2">{stat.title}</h3>
                                            <div className="flex items-end justify-between">
                                                <p className="text-4xl font-display font-bold text-stone-800 group-hover:text-terracotta-600 transition-colors">{stat.value}</p>
                                                {stat.change && (
                                                    <div className="flex flex-col items-end">
                                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-lg text-xs font-bold mb-1">{stat.change}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-stone-400 text-xs mt-3 font-medium">{stat.note}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart Area */}
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 relative overflow-hidden">
                                    <h3 className="font-display text-xl font-bold text-stone-800 mb-8 flex items-center justify-between">
                                        Sales Performance
                                        <button className="text-stone-400 hover:text-stone-800 transition-colors"><Filter size={18} /></button>
                                    </h3>
                                    <div className="h-80 w-full relative z-10">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value}`} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                                <Tooltip
                                                    cursor={{ fill: '#F5F5F4' }}
                                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                                />
                                                <Bar dataKey="sales" fill="#EA580C" radius={[4, 4, 0, 0]} barSize={32} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-display text-xl font-bold text-stone-800">Recent Orders</h3>
                                        <button onClick={() => setActiveTab('orders')} className="text-terracotta-600 font-bold text-sm hover:underline">View All Orders</button>
                                    </div>
                                    <div className="space-y-4">
                                        {mockOrders.slice(0, 2).map((order) => (
                                            <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-stone-50 rounded-xl">
                                                <div>
                                                    <p className="font-bold text-stone-800">{order.customer}</p>
                                                    <p className="text-sm text-stone-500">{order.items}</p>
                                                </div>
                                                <div className="mt-2 sm:mt-0 text-right">
                                                    <p className="font-mono font-bold text-stone-800">₹{order.total.toLocaleString()}</p>
                                                    <p className="text-xs text-stone-500">{order.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'upload' && (
                            <motion.div
                                key="upload"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100"
                            >
                                <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-6">
                                    <div>
                                        <h2 className="font-display text-2xl font-bold text-stone-800">Add New Product</h2>
                                        <p className="text-stone-500 text-sm mt-1">Fill in the details to publish your craft</p>
                                    </div>
                                    <button onClick={() => setActiveTab('products')} className="text-sm font-medium text-stone-500 hover:text-stone-800 px-4 py-2 hover:bg-stone-50 rounded-lg transition-colors">Cancel</button>
                                </div>

                                <form className="space-y-8" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            {/* Left Column Inputs */}
                                            {['name', 'material', 'price', 'category'].map((field) => (
                                                <div key={field} className={field === 'price' || field === 'category' ? '' : ''}>
                                                    {field === 'price' || field === 'category' ? null : (
                                                        <div>
                                                            <label className="block text-sm font-bold text-stone-700 mb-2 capitalize">{field}</label>
                                                            <input
                                                                name={field}
                                                                value={newProduct[field]}
                                                                onChange={handleInputChange}
                                                                required
                                                                type="text"
                                                                className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all bg-stone-50/30 focus:bg-white"
                                                                placeholder={`Enter ${field}...`}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}

                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-bold text-stone-700 mb-2">Price (₹)</label>
                                                    <div className="relative">
                                                        <span className="absolute left-4 top-3.5 text-stone-400 font-bold">₹</span>
                                                        <input
                                                            name="price"
                                                            value={newProduct.price}
                                                            onChange={handleInputChange}
                                                            required
                                                            type="number"
                                                            className="w-full pl-8 pr-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all font-mono"
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-stone-700 mb-2">Category</label>
                                                    <select
                                                        name="category"
                                                        value={newProduct.category}
                                                        onChange={handleInputChange}
                                                        className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all bg-white"
                                                    >
                                                        <option>Saree</option>
                                                        <option>Shawl</option>
                                                        <option>Home Decor</option>
                                                        <option>Fabric</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Image Upload */}
                                            <div>
                                                <label className="block text-sm font-bold text-stone-700 mb-2">Product Images</label>
                                                <div className="relative border-2 border-dashed border-stone-200 rounded-xl p-4 text-center hover:bg-stone-50 hover:border-terracotta-400 cursor-pointer transition-all group h-72 flex flex-col items-center justify-center overflow-hidden bg-stone-50/50">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />

                                                    {newProduct.image ? (
                                                        <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                                                            <img src={newProduct.image} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-sm" />
                                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                                                                <p className="text-white font-medium flex items-center gap-2"><Edit size={16} /> Change Image</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
                                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-terracotta-500 border border-stone-100">
                                                                <Upload size={28} />
                                                            </div>
                                                            <p className="text-lg font-bold text-stone-700">Drop your image here</p>
                                                            <p className="text-sm text-stone-400 mt-1">or click to browse</p>
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-stone-700 mb-2">Story & Description</label>
                                                <textarea
                                                    name="description"
                                                    value={newProduct.description}
                                                    onChange={handleInputChange}
                                                    required
                                                    rows="4"
                                                    className="w-full px-4 py-3 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all resize-none bg-stone-50/30 focus:bg-white"
                                                    placeholder="Tell the story behind this piece..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end pt-6 border-t border-stone-100">
                                        <button type="submit" className="px-8 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2">
                                            <Plus size={18} /> Publish Product
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        {activeTab === 'products' && (
                            <motion.div
                                key="products"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden"
                            >
                                <div className="px-8 py-6 border-b border-stone-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-stone-50/50">
                                    <h3 className="font-bold text-lg text-stone-800">Inventory ({products.length})</h3>
                                    <div className="flex gap-3 w-full sm:w-auto">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
                                            <input
                                                type="text"
                                                placeholder="Search products..."
                                                value={inventorySearch}
                                                onChange={(e) => setInventorySearch(e.target.value)}
                                                className="pl-10 pr-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-stone-400 w-full sm:w-64 bg-white"
                                            />
                                        </div>
                                        <button onClick={() => setActiveTab('upload')} className="bg-terracotta-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-terracotta-700 whitespace-nowrap flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                                            <Plus size={16} /> Add New
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-stone-600">
                                        <thead className="bg-stone-100/50 text-stone-800 font-bold uppercase text-xs tracking-wider">
                                            <tr>
                                                <th className="px-8 py-4">Product</th>
                                                <th className="px-6 py-4">Category</th>
                                                <th className="px-6 py-4">Price</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        {loading ? (
                                            <tbody>
                                                <tr>
                                                    <td colSpan="5" className="px-8 py-12 text-center text-stone-400">
                                                        <div className="flex justify-center items-center gap-2">
                                                            <div className="w-4 h-4 border-2 border-stone-300 border-t-terracotta-600 rounded-full animate-spin"></div>
                                                            Loading inventory...
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ) : (
                                            <tbody className="divide-y divide-stone-50">
                                                {filteredInventory.map((product) => (
                                                    <tr key={product.id} className="hover:bg-stone-50 transition-colors group">
                                                        <td className="px-8 py-4 font-medium text-stone-900">
                                                            <div className="flex items-center">
                                                                <img src={product.image} alt="" className="w-12 h-12 rounded-lg mr-4 object-cover shadow-sm group-hover:scale-110 transition-transform bg-stone-200" />
                                                                {product.name}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4"><span className="bg-stone-100 text-stone-600 px-2 py-1 rounded text-xs font-medium">{product.category}</span></td>
                                                        <td className="px-6 py-4 font-bold font-mono text-stone-700">₹{product.price.toLocaleString()}</td>
                                                        <td className="px-6 py-4"><span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold ring-1 ring-green-600/20 flex w-fit items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>Active</span></td>
                                                        <td className="px-6 py-4 text-right space-x-1">
                                                            <button className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"><Edit size={16} /></button>
                                                            <button onClick={() => handleDelete(product.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {filteredInventory.length === 0 && (
                                                    <tr>
                                                        <td colSpan="5" className="px-8 py-16 text-center text-stone-400 italic">
                                                            <p>No products found matching "{inventorySearch}"</p>
                                                            <button onClick={() => setActiveTab('upload')} className="mt-2 text-terracotta-600 font-bold hover:underline">Add your first product</button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'orders' && (
                            <motion.div
                                key="orders"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden"
                            >
                                <div className="px-8 py-6 border-b border-stone-100 bg-stone-50/50">
                                    <h3 className="font-bold text-lg text-stone-800">Customer Orders</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm text-stone-600">
                                        <thead className="bg-stone-100/50 text-stone-800 font-bold uppercase text-xs tracking-wider">
                                            <tr>
                                                <th className="px-8 py-4">Order ID</th>
                                                <th className="px-6 py-4">Customer</th>
                                                <th className="px-6 py-4">Items</th>
                                                <th className="px-6 py-4">Total</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4 text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-stone-50">
                                            {mockOrders.map((order) => (
                                                <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                                                    <td className="px-8 py-4 font-bold text-stone-800">{order.id}</td>
                                                    <td className="px-6 py-4">{order.customer}</td>
                                                    <td className="px-6 py-4 text-stone-500 truncate max-w-xs" title={order.items}>{order.items}</td>
                                                    <td className="px-6 py-4 font-mono font-bold text-stone-700">₹{order.total.toLocaleString()}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block
                                                            ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                                    'bg-green-100 text-green-700'}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="text-stone-400 hover:text-terracotta-600 font-medium">Manage</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 max-w-3xl"
                            >
                                <h2 className="font-display text-2xl font-bold text-stone-800 mb-8">Store Settings</h2>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800 text-sm">
                                        <AlertCircle className="shrink-0 mt-0.5" size={18} />
                                        <p>Changes made to your shop profile will be visible to all customers immediately after saving.</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-stone-700 mb-2">Shop Name</label>
                                            <input type="text" defaultValue="Varanasi Heritage Looms" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-stone-700 mb-2">Support Email</label>
                                            <input type="email" defaultValue="support@heritage.com" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2">Shop Description</label>
                                        <textarea rows="4" defaultValue="We bring you the finest Banarasi silk sarees, woven with tradition and care by master artisans of Varanasi." className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all resize-none"></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-stone-700 mb-2">Shipping Origin</label>
                                        <input type="text" defaultValue="D-45, Silk Colony, Varanasi, UP - 221001" className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-terracotta-500/20 focus:border-terracotta-500 transition-all" />
                                    </div>

                                    <div className="pt-6 border-t border-stone-100 flex justify-end">
                                        <button className="bg-stone-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors flex items-center gap-2">
                                            <Save size={18} /> Save Changes
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
