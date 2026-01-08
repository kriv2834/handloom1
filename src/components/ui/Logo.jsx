import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = ({ className = "", iconSize = 44 }) => {
    const [isBag, setIsBag] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsBag(prev => !prev);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(interval);
    }, []);

    // Optimized Bezier Paths for Smooth Morphing
    // We construct both shapes using a single path with the same number of commands.

    // Path 1: Infinity Loop (Crossing Figure-8)
    // Structure: M Start -> C Loop 1 Out -> C Loop 1 Back -> C Loop 2 Out -> C Loop 2 Back -> Z
    const infinityPath = "M 50 30 C 35 15, 15 15, 15 30 C 15 45, 35 45, 50 30 C 65 15, 85 15, 85 30 C 85 45, 65 45, 50 30 Z";

    // Path 2: Handbag Shape ("Hobo Bag" style)
    // We map the points of the infinity loop to form a bag.
    // The "Crossing Point" (50 30) stays roughly central/top.
    // The "Left Loop" becomes the "Left Side + Bottom".
    // The "Right Loop" becomes the "Right Side + Bottom".
    // Let's adjust to make it look like a nice round tote.
    const bagPath = "M 50 20 C 40 20, 30 30, 30 40 C 30 58, 45 58, 50 58 C 55 58, 70 58, 70 40 C 70 30, 60 20, 50 20 Z";

    // Bag Handle Path (appears separately for detail)
    const handlePath = "M 40 40 Q 50 10 60 40";

    return (
        <Link to="/" className={`flex items-center gap-2 group ${className}`}>
            <div className="relative flex items-center justify-center p-1 w-16 h-12">
                <motion.svg
                    width={iconSize}
                    height={iconSize * 0.7}
                    viewBox="0 0 100 65"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <defs>
                        <linearGradient id="gradientLoop" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4d7c0f" />
                            <stop offset="50%" stopColor="#65a30d" />
                            <stop offset="100%" stopColor="#84cc16" />
                        </linearGradient>
                    </defs>

                    {/* Morphing Body */}
                    <motion.path
                        d={isBag ? bagPath : infinityPath}
                        stroke="url(#gradientLoop)"
                        strokeWidth={isBag ? 3 : 4}
                        fill={isBag ? "rgba(101, 163, 13, 0.15)" : "transparent"}
                        animate={{
                            d: isBag ? bagPath : infinityPath,
                            fill: isBag ? "rgba(101, 163, 13, 0.15)" : "rgba(101, 163, 13, 0)",
                            strokeWidth: isBag ? 3 : 4
                        }}
                        transition={{
                            duration: 1.2,
                            ease: [0.4, 0, 0.2, 1]
                        }}
                    />

                    {/* Bag Handle Detail (Only appears when bag) */}
                    <AnimatePresence>
                        {isBag && (
                            <motion.path
                                d={handlePath}
                                stroke="#4d7c0f"
                                strokeWidth="2.5"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                exit={{ pathLength: 0, opacity: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        )}
                    </AnimatePresence>

                    {/* Infinity Center Knot Detail (Only appears when loop) */}
                    <AnimatePresence>
                        {!isBag && (
                            <motion.circle
                                cx="50"
                                cy="30"
                                r="2"
                                fill="#4d7c0f"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.5 }}
                            />
                        )}
                    </AnimatePresence>

                </motion.svg>
            </div>
            <div className="flex flex-col">
                <span className="font-display font-bold text-2xl leading-none tracking-tight text-stone-800 group-hover:text-olive-700 transition-colors flex items-center">
                    L<span className="text-3xl -mt-1 mx-[1px] bg-gradient-to-r from-olive-700 via-olive-500 to-lime-500 bg-clip-text text-transparent inline-block filter drop-shadow-sm">∞</span>m<span className="text-olive-600">Legacy</span>
                </span>
                <AnimatePresence mode="wait">
                    <motion.span
                        key={isBag ? "bag-text" : "loop-text"}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="text-[0.65rem] uppercase tracking-widest text-stone-500 font-medium ml-0.5"
                    >
                        {isBag ? "Handcrafted Style" : "Infinite Tradition"}
                    </motion.span>
                </AnimatePresence>
            </div>
        </Link>
    );
};

export default Logo;
