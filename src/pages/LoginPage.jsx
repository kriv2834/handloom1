import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Store, Fingerprint, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LoginPage = () => {
    const [isSeller, setIsSeller] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [currentQuote, setCurrentQuote] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const { login } = useAuth();
    const navigate = useNavigate();

    // Assets provided by user
    const slides = [
        "https://images.unsplash.com/photo-1606293926075-69a00d0352cf?q=80&w=1000&auto=format&fit=crop", // Process
        "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1000&auto=format&fit=crop", // Product
        "https://images.unsplash.com/photo-1598556885317-0f9c2d79d618?q=80&w=1000&auto=format&fit=crop"  // Human
    ];

    const quotes = [
        { text: "The sound of the loom is the heartbeat of our village.", author: "Rajesh, Master Weaver, Varanasi" },
        { text: "Every thread I weave carries a prayer for the one who wears it.", author: "Lakshmi, Artisan, Pochampally" },
        { text: "We don't just make cloth. We make memories.", author: "Kabir, Dyer, Kutch" }
    ];

    // Quote rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Image Slider rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const role = isSeller ? 'seller' : 'buyer';
        login(email, password, role);

        // Redirect based on role
        if (role === 'seller') {
            navigate('/seller/dashboard');
        } else {
            navigate('/'); // Redirect buyer to home
        }
    };

    const handleDemoLogin = (role) => {
        setIsSeller(role === 'seller');
        setEmail(role === 'seller' ? 'artisan@loomlegacy.com' : 'buyer@example.com');
        setPassword('demo123');
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] opacity-5"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl w-full flex rounded-3xl shadow-2xl overflow-hidden bg-white relative z-10 min-h-[600px]"
            >
                {/* Left Panel - Visual Storytelling */}
                <div className="hidden md:block w-1/2 relative bg-stone-900 overflow-hidden">
                    {/* Image Slider */}
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={currentSlide}
                            src={slides[currentSlide]}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Handloom Story"
                        />
                    </AnimatePresence>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                    {/* Text Content */}
                    <div className="relative p-12 h-full flex flex-col justify-end text-white z-20">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <h2 className="font-display text-4xl font-bold mb-2">
                                Discover Timeless Art.
                            </h2>

                            {/* Rotating Quotes */}
                            <div className="h-24">
                                <AnimatePresence mode='wait'>
                                    <motion.div
                                        key={currentQuote}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <p className="text-xl font-serif italic text-stone-200 leading-relaxed opacity-90">
                                            "{quotes[currentQuote].text}"
                                        </p>
                                        <div className="flex items-center gap-3 mt-4">
                                            <div className="h-px w-8 bg-terracotta-400"></div>
                                            <p className="text-stone-400 text-xs uppercase tracking-widest">
                                                {quotes[currentQuote].author}
                                            </p>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Right Panel - Form Experience */}
                <div className="w-full md:w-1/2 p-10 md:p-14 bg-white flex flex-col justify-center">

                    <div className="mb-8 text-center md:text-left">
                        <h2 className="text-3xl font-bold text-stone-900 mb-2 font-display">
                            {isSeller ? 'Artisan Login' : 'Welcome Back'}
                        </h2>
                        <p className="text-stone-500 text-sm">
                            {isSeller ? 'Manage your craft and legacy.' : 'Enter your details to access your account.'}
                        </p>
                    </div>

                    {/* Role Toggle */}
                    <div className="flex bg-stone-100 p-1 rounded-xl mb-8 w-fit mx-auto md:mx-0">
                        <button
                            onClick={() => setIsSeller(false)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${!isSeller ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            Buyer
                        </button>
                        <button
                            onClick={() => setIsSeller(true)}
                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${isSeller ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            Seller
                        </button>
                    </div>

                    {/* Social Login */}
                    {!isSeller && (
                        <div className="space-y-3 mb-6">
                            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors text-sm font-bold text-stone-700">
                                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Continue with Google
                            </button>
                            <button className="w-full flex items-center justify-center gap-3 py-2.5 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors text-sm font-bold text-stone-700">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.35-1.09-.56-2.09-.48-3.08.35 1.04 1.39 2.05 1.48 3.08 1.48 1.05 0 2.05-.1 3.08-.35.95-.23 1.95.12 3.08.35 1.09 0 2.09-.1 3.08-.35zM12.03 7.25c-.24-1.33.61-2.9 1.83-3.6 1.35-.78 3.12-.42 3.5.91.43 1.5-.7 3.25-1.95 3.75-1.3.52-2.92-.09-3.38-1.06zm8.11 6.8c.45 1.25.92 2.5 1.38 3.75-1.25 3.56-3.38 5.75-6.5 5.75-1.63 0-2.88-.5-4.25-.5s-2.75.5-4.25.5c-3.25 0-5.75-2.5-6.63-6.5-1.12-5.12 2.25-9 6.25-9 1.5 0 2.63.5 3.75.5 1 0 2.38-.5 3.63-.5 1.5 0 4.25 1 5.38 3.5-3.83 1.83-2.75 8.12 1.25 9z" /></svg>
                                Continue with Apple
                            </button>
                        </div>
                    )}

                    {(!isSeller) && (
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-stone-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-white text-stone-500">Or continue with email</span>
                            </div>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5">Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:ring-4 focus:ring-terracotta-500/10 transition-all font-medium"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-stone-700 uppercase tracking-widest mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-terracotta-500 focus:ring-4 focus:ring-terracotta-500/10 transition-all font-medium pr-10"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-xs">
                            <button type="button" onClick={() => handleDemoLogin(isSeller ? 'seller' : 'buyer')} className="text-stone-500 hover:text-terracotta-600 transition-colors flex items-center gap-1">
                                <Fingerprint size={12} /> Auto-Fill Demo
                            </button>
                            <a href="#" className="font-bold text-stone-900 hover:text-terracotta-600 transition-colors">Forgot password?</a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full py-4 rounded-xl bg-stone-900 text-white font-bold text-sm shadow-xl hover:bg-black transition-all flex items-center justify-center gap-2 group"
                        >
                            Log In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </form>

                    <p className="mt-8 text-center text-xs text-stone-400">
                        No spam. Ever. Your data stays with you.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
