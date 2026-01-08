import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

const SpinWheel = ({ isOpen, onClose }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [prize, setPrize] = useState(null);

    // Segments configuration
    // The angles are: 0-60, 60-120, 120-180, 180-240, 240-300, 300-360
    // We will align the pointer to point to the top (which is technically -90deg or 270deg in standard unit circle,
    // but visual rotation is easier to relative to 0).
    const segments = [
        { label: '5% OFF', value: 'WELCOME5', color: '#E8F5E9', text: '#2E7D32' },
        { label: '10% OFF', value: 'HANDLOOM10', color: '#FFF3E0', text: '#EF6C00' },
        { label: 'Try Again', value: null, color: '#FFEBEE', text: '#C62828' },
        { label: '15% OFF', value: 'LEGACY15', color: '#F3E5F5', text: '#7B1FA2' },
        { label: 'Free Ship', value: 'FREESHIP', color: '#E3F2FD', text: '#1565C0' },
        { label: '15% OFF', value: 'LEGACY15', color: '#F3E5F5', text: '#7B1FA2' },
    ];

    const spinWheel = () => {
        if (isSpinning) return;
        setIsSpinning(true);

        // Logic to determine result
        // We want to control the outcome chance.
        // Let's make "15% OFF" possible but maybe not extremely common if we were being strict,
        // but user asked for "max discount upto 15% perfect", so let's allow it fairly.
        // Random segment index between 0 and 5.
        const randomIndex = Math.floor(Math.random() * segments.length);
        const selectedSegment = segments[randomIndex];

        // Calculate rotation
        // Each segment is 60 degrees (360 / 6).
        // To point to a segment at the top, we need to rotate the wheel so that segment is at -90deg (top).
        // Let's just do a simple absolute rotation calculation.
        // Base rotation to spin a few times (e.g., 5 full spins = 1800 deg).
        const baseSpins = 360 * 5;
        // Target angle for the specific segment.
        // If we want segment `i` to be at the pointer (let's say pointer is at Top).
        // If Top is 0 degrees for calculation simplicity:
        // Segment 0 is at 0-60. Center is 30.
        // We need to rotate -30 to bring it to top.
        // Let's use a simpler random degree + snapping method or just fixed target.

        // Let's assume the arrow is at the TOP.
        // Segment 0: 0-60 deg. Center 30.
        // Segment 1: 60-120 deg. Center 90.
        // ...
        // To bring Center 30 to Top (effectively 360 or 0), we rotate by 360 - 30 = 330.
        // Actually, CSS rotation rotates clockwise.
        // If 0 is at top relative to container...
        // Let's keep it simple: Spin a random amount + lots of spins.
        // Then normalize to find out what won.

        const segmentAngle = 360 / segments.length; // 60
        // We want to land on 'randomIndex'.
        // To land on index 0 (0-60), the wheel needs to be rotated such that (360 - rotation % 360) falls in 0-60?
        // Let's simplify:
        // We want the wheel's final rotation to place the chosen segment at the top.
        // If segment 0 is at [0, 60] initially (clockwise). Top is roughly 0 (or 270?).
        // Let's assume standard CSS rotation starting at 12 o'clock if we build it that way, or 3 o'clock.
        // Let's build the wheel visual rotation:
        // If we rotate the container, the content rotates. 
        // Pointer is static at the top.
        // To get segment 'i' to top:
        // We need to rotate the WHEEL counter-clockwise by 'angle of segment i center'.
        // Or clockwise by 360 - 'angle'.

        const segmentCenter = (randomIndex * segmentAngle) + (segmentAngle / 2);
        // Example: Index 0 -> 30deg. Index 1 -> 90deg.

        // We want this 'segmentCenter' to align with the pointer (Start at 0deg? usually 0 is right/top depending on setup).
        // Let's assume 0 deg is Top in our CSS construction for simplicity.
        // So we need to rotate the wheel backwards by 'segmentCenter' deg.
        // Or forward by (360 - segmentCenter).

        const targetRotation = baseSpins + (360 - segmentCenter);

        setRotation(targetRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setPrize(selectedSegment);
        }, 4000); // 4 seconds spin
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full relative"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 text-stone-400 hover:text-stone-600"
                        >
                            <X size={24} />
                        </button>

                        <div className="p-8 text-center">
                            <h2 className="font-display text-3xl font-bold text-stone-800 mb-2">
                                Welcome Gift!
                            </h2>
                            <p className="text-stone-600 mb-8">
                                Spin the wheel to unlock your exclusive discount.
                            </p>

                            <div className="relative w-64 h-64 mx-auto mb-8">
                                {/* Pointer */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-terracotta-600 fill-current">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 22L12 2" stroke="white" strokeWidth="2" />
                                        <path d="M12 22L7 12H17L12 22Z" />
                                    </svg>
                                </div>

                                {/* Wheel */}
                                <motion.div
                                    className="w-full h-full rounded-full border-4 border-white shadow-lg relative overflow-hidden"
                                    style={{
                                        background: `conic-gradient(
                                            ${segments[0].color} 0deg 60deg,
                                            ${segments[1].color} 60deg 120deg,
                                            ${segments[2].color} 120deg 180deg,
                                            ${segments[3].color} 180deg 240deg,
                                            ${segments[4].color} 240deg 300deg,
                                            ${segments[5].color} 300deg 360deg
                                        )`,
                                        rotate: rotation
                                    }}
                                    animate={{ rotate: rotation }}
                                    transition={{ duration: 4, ease: "circOut" }}
                                >
                                    {segments.map((seg, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-full h-full top-0 left-0 flex justify-center pt-8 font-bold text-sm tracking-tighter"
                                            style={{
                                                transform: `rotate(${i * 60 + 30}deg)`,
                                                color: seg.text
                                            }}
                                        >
                                            <span style={{ transform: 'translateY(10px)' }}>{seg.label}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* Center Pin */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md z-10 border-2 border-stone-200"></div>
                            </div>

                            {!prize && (
                                <button
                                    onClick={spinWheel}
                                    disabled={isSpinning}
                                    className="bg-terracotta-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-terracotta-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSpinning ? 'Spinning...' : 'Spin to Win'}
                                </button>
                            )}

                            {prize && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-stone-50 p-4 rounded-xl border border-stone-200"
                                >
                                    <div className="flex items-center justify-center gap-2 text-terracotta-700 font-bold mb-2">
                                        <Gift size={20} />
                                        <span>Congratulations!</span>
                                    </div>
                                    {prize.value ? (
                                        <>
                                            <p className="text-stone-600 text-sm mb-1">
                                                You won <strong>{prize.label}</strong>! Use code:
                                            </p>
                                            <div className="bg-white border-2 border-dashed border-terracotta-300 p-2 rounded text-xl font-mono text-terracotta-800 font-bold tracking-widest select-all">
                                                {prize.value}
                                            </div>
                                            <p className="text-xs text-stone-400 mt-2">
                                                *Discount applied at checkout.
                                            </p>
                                        </>
                                    ) : (
                                        <p className="text-stone-600">
                                            Better luck next time! Wait, try one more time? (Just kidding, refresh to try again!)
                                        </p>
                                    )}
                                    <button
                                        onClick={onClose}
                                        className="mt-4 text-sm text-stone-500 hover:text-stone-800 underline"
                                    >
                                        Close and Shop
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SpinWheel;
