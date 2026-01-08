import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer = () => {
    return (
        <footer className="bg-olive-900 text-olive-50 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="mb-6">
                            <Logo />
                        </div>
                        <p className="text-stone-400 text-sm leading-relaxed">
                            Weaving traditions, empowering artisans. Supporting the hands that create timeless beauty through authentic handloom craftsmanship.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg font-semibold">Shop</h4>
                        <ul className="space-y-2 text-sm text-olive-200">
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">Sarees</a></li>
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">Shawls</a></li>
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">Home Decor</a></li>
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">New Arrivals</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg font-semibold">Support</h4>
                        <ul className="space-y-2 text-sm text-olive-200">
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">Track Order</a></li>
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">Returns & Refunds</a></li>
                            <li><a href="#" className="hover:text-terracotta-300 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-serif text-lg font-semibold">Stay Connected</h4>
                        <p className="text-olive-200 text-sm">Subscribe for updates on new collections and artisan stories.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-olive-800 text-olive-50 px-4 py-2 rounded-l-md focus:outline-none w-full border border-olive-700 focus:border-terracotta-400"
                            />
                            <button className="bg-terracotta-600 hover:bg-terracotta-500 text-white px-4 py-2 rounded-r-md transition-colors">
                                <Mail size={18} />
                            </button>
                        </div>
                        <div className="flex space-x-4 pt-4">
                            <a href="#" className="text-olive-300 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-olive-300 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-olive-300 hover:text-white transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-olive-800 mt-12 pt-8 text-center text-sm text-olive-400">
                    <p>© {new Date().getFullYear()} LoomLegacy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
