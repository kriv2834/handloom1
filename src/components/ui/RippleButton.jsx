import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RippleButton = ({ children, onClick, className = "", ...props }) => {
    const [ripples, setRipples] = useState([]);

    const addRipple = (e) => {
        const button = e.currentTarget.getBoundingClientRect();
        const diameter = Math.max(button.width, button.height);
        const radius = diameter / 2;

        const x = e.clientX - button.left - radius;
        const y = e.clientY - button.top - radius;

        const newRipple = {
            x,
            y,
            id: Date.now()
        };

        setRipples((prev) => [...prev, newRipple]);

        if (onClick) onClick(e);
    };

    // Cleanup ripples
    useEffect(() => {
        if (ripples.length > 0) {
            const timer = setTimeout(() => {
                setRipples((prev) => prev.slice(1));
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [ripples]);

    return (
        <motion.button
            className={`relative overflow-hidden ${className}`}
            onClick={addRipple}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{ transform: "scale(0)", opacity: 0.35 }}
                        animate={{ transform: "scale(4)", opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }} // Slow, soft ripple
                        className="absolute bg-white rounded-full pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 100, // Fixed base size, scales up
                            height: 100,
                        }}
                    />
                ))}
            </AnimatePresence>
        </motion.button>
    );
};

export default RippleButton;
