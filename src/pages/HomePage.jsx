import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Heart, ShieldCheck, Leaf, Users, ArrowDown, MoveUpRight, Sparkles } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ui/ProductCard';
import SpinWheel from '../components/ui/SpinWheel';
import MagneticButton from '../components/ui/MagneticButton';

// Imported Images
import heroModelImg from '../assets/images/hero_model.png';
import heroTextureImg from '../assets/images/hero_texture.png';
import heroArtisanImg from '../assets/images/hero_artisan.png';
import makerProfileImg from '../assets/images/maker_profile.png';

const Marquee = () => {
    return (
        <div className="relative flex overflow-x-hidden bg-terracotta-600/90 backdrop-blur-sm py-3 border-y border-terracotta-500/30">
            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: [0, -1000] }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
                {Array(10).fill("HANDMADE • SUSTAINABLE • 100% COTTON • CULTURALLY ROOTED • ").map((text, i) => (
                    <span key={i} className="text-white font-bold text-sm tracking-widest mx-4 uppercase">{text}</span>
                ))}
            </motion.div>
        </div>
    );
};

const HomePage = () => {
    const { products } = useProducts();
    const featuredProducts = products.slice(0, 3);
    const { scrollY } = useScroll();
    const yHero = useTransform(scrollY, [0, 500], [0, 100]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerText = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
    };

    const letterAnim = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "backOut" } }
    };

    return (
        <div className="min-h-screen bg-cream-50 bg-noise relative overflow-x-hidden selection:bg-terracotta-200">
            <SpinWheel />

            {/* Gen Z Hero Section: Split Layout + Bento Grid */}
            <section className="relative min-h-[92vh] flex flex-col pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 flex-grow items-center">

                    {/* Left Column: Typography & CTA */}
                    <div className="lg:col-span-5 flex flex-col justify-center relative z-10">
                        <motion.div initial="hidden" animate="visible" variants={staggerText} className="mb-8">
                            <div className="overflow-hidden">
                                <motion.h1 className="font-display text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-stone-900 mb-2">
                                    <span className="block italic font-light">Weaving</span>
                                    <span className="block font-medium">Traditions,</span>
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1 className="font-sans font-black text-5xl md:text-7xl lg:text-8xl leading-none text-transparent bg-clip-text bg-gradient-to-r from-terracotta-600 to-orange-500 uppercase tracking-tight">
                                    <motion.span variants={letterAnim}>Empowering</motion.span><br />
                                    <motion.span variants={letterAnim}>Lives.</motion.span>
                                </motion.h1>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-lg md:text-xl text-stone-600 mb-10 max-w-md font-medium leading-relaxed"
                        >
                            Not just fabric. A movement. Wear the art that kept a village alive.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                        >
                            <Link to="/shop">
                                <MagneticButton className="group bg-stone-900 hover:bg-forest-800 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-colors duration-300 shadow-xl hover:shadow-2xl">
                                    Explore Collection
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-terracotta-600/0 group-hover:bg-terracotta-600/10 rounded-full transition-colors" />
                                    {/* Note: Ideally color shift is done via CSS classes, handled above */}
                                </MagneticButton>
                            </Link>

                            {/* Social Proof Pill */}
                            <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-stone-200 px-4 py-2 rounded-full shadow-sm hover:scale-105 transition-transform cursor-default">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-bold text-stone-700">78% profits to artisans</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Bento Grid */}
                    <div className="lg:col-span-7 h-full w-full relative min-h-[500px]">
                        <motion.div
                            style={{ y: yHero }}
                            className="grid grid-cols-2 grid-rows-2 gap-4 h-full w-full"
                        >
                            {/* 1. Large Vertical Image (Model) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                className="row-span-2 relative overflow-hidden rounded-3xl group border-4 border-white shadow-2xl"
                            >
                                <img
                                    src={heroModelImg}
                                    alt="Street Style Handloom"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                                    <p className="text-white font-serif italic text-xl">"Worn by culture."</p>
                                </div>
                            </motion.div>

                            {/* 2. Small Square (Macro Texture) */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl group"
                            >
                                <img
                                    src={heroTextureImg}
                                    alt="Fabric Texture"
                                    className="w-full h-full object-cover group-hover:rotate-3 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                                    <p className="text-white font-bold uppercase tracking-widest text-xs border border-white px-3 py-1 rounded-full">Pure Cotton</p>
                                </div>
                            </motion.div>

                            {/* 3. Small Image (Artisan) - Replaced Video */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="relative overflow-hidden rounded-3xl border-4 border-white shadow-xl group"
                            >
                                <img
                                    src={heroArtisanImg}
                                    alt="Artisan Weaving"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full animate-spin-slow">
                                    <Sparkles size={16} className="text-amber-500" />
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                        <Users size={12} /> Meet Makers
                                    </span>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 z-20 pointer-events-none"
                >
                    <span className="text-xs font-medium tracking-widest uppercase">Scroll to meet the makers</span>
                    <ArrowDown size={16} />
                </motion.div>
            </section>

            {/* Infinite Marquee */}
            <Marquee />

            {/* [NEW] From Loom to You - Horizontal Storytelling */}
            <section className="py-20 px-4 max-w-7xl mx-auto overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="md:w-1/3">
                        <span className="text-terracotta-600 font-bold uppercase tracking-widest text-sm mb-2 block">The Journey</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-6">From Loom<br />to You.</h2>
                        <p className="text-stone-600 font-medium">Every thread has a memory. Trace the path of your fabric from the soil to your soul.</p>
                    </div>
                    <div className="md:w-2/3 flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar">
                        {[
                            { icon: Leaf, title: "Sourced", desc: "Organic cotton from Gujarat" },
                            { icon: Sparkles, title: "Dyed", desc: "Natural indigo & turmeric" },
                            { icon: Users, title: "Woven", desc: "3 days on a pit loom" },
                            { icon: Heart, title: "Loved", desc: "By you, forever" }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                className="min-w-[200px] bg-white border border-stone-200 p-6 rounded-2xl snap-center hover:border-terracotta-400 transition-colors group cursor-default"
                                whileHover={{ y: -5 }}
                            >
                                <div className="bg-stone-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-terracotta-100 transition-colors">
                                    <step.icon size={20} className="text-stone-600 group-hover:text-terracotta-600" />
                                </div>
                                <h3 className="font-bold text-lg text-stone-900 mb-1">{step.title}</h3>
                                <p className="text-sm text-stone-500">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* [NEW] Culture Drops - Limited Collections */}
            <section className="py-12 bg-stone-900 text-stone-50 overflow-hidden relative">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <span className="bg-lime-400 text-stone-900 text-xs font-black uppercase tracking-widest px-2 py-1 rounded-sm mb-3 inline-block animate-pulse">Live Now</span>
                        <h2 className="font-display text-5xl font-bold text-white mb-2">Monsoon Edit</h2>
                        <p className="text-stone-400">Rain-washed linens. Limited run of 50 pieces.</p>
                    </div>
                    <div className="flex gap-4 text-center">
                        {["02", "14", "45"].map((time, i) => (
                            <div key={i} className="bg-stone-800 p-4 rounded-xl min-w-[80px] border border-stone-700">
                                <span className="block text-3xl font-bold font-mono text-lime-400">{time}</span>
                                <span className="text-[10px] uppercase text-stone-500 tracking-wider">{["Hrs", "Mins", "Secs"][i]}</span>
                            </div>
                        ))}
                    </div>
                    <Link to="/shop">
                        <MagneticButton className="bg-white text-stone-900 px-8 py-3 rounded-full font-bold hover:bg-lime-400 transition-colors">
                            Shop Drop
                        </MagneticButton>
                    </Link>
                </div>
            </section>

            {/* [NEW] Meet the Maker */}
            <section className="py-24 px-4 max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center bg-white rounded-[3rem] p-8 md:p-12 shadow-xl border border-stone-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-100 rounded-full blur-[80px] opacity-50 pointer-events-none"></div>

                    <div className="md:w-1/2 relative">
                        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] group">
                            <img src={makerProfileImg} alt="Artisan Weaving" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl">
                                <p className="font-bold text-stone-900">Ramesh Kumar</p>
                                <p className="text-xs text-stone-500">Master Weaver, 28 Years</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2 relative z-10">
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-6">"I don't just weave cloth.<br />I weave my father's memory."</h2>
                        <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                            Ramesh weaves the intricate Jamdani motifs entirely by hand. No graph paper, just muscle memory passed down through seven generations in Varanasi.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <span className="block text-3xl font-bold text-terracotta-600">14</span>
                                <span className="text-sm text-stone-500 font-medium">Days per Saree</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-terracotta-600">100%</span>
                                <span className="text-sm text-stone-500 font-medium">Hand-dyed Silk</span>
                            </div>
                        </div>

                        <Link to="/shop">
                            <MagneticButton className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-terracotta-600 transition-colors shadow-lg">
                                View Ramesh's Work <ArrowRight size={18} />
                            </MagneticButton>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 px-4 max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <span className="text-terracotta-600 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-terracotta-600"></span> Curated Selection
                        </span>
                        <h2 className="font-display text-5xl font-bold text-stone-900 mt-3">Week's Highlights</h2>
                    </div>
                    <Link to="/shop" className="group flex items-center gap-2 text-stone-800 font-bold border-b-2 border-stone-800 pb-1 hover:text-terracotta-600 hover:border-terracotta-600 transition-colors">
                        View Full Collection <MoveUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeInUp}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why We Exist (Renamed from Voices/Testimonials) - Enhanced for Gen Z */}
            <section className="py-32 bg-stone-900 text-stone-100 relative overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-terracotta-900/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-olive-900/30 rounded-full blur-[80px]" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="font-display text-5xl md:text-6xl font-bold mb-6">Why We Exist</h2>
                        <p className="text-xl text-stone-400 max-w-2xl mx-auto font-light">We don't just sell clothes. We bridge the gap between heritage and your wardrobe, digitizing the loom one artisan at a time.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {/* Digital Art Style Testimonial Cards */}
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-terracotta-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full border-2 border-stone-700 p-1">
                                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888" alt="Lakshmi" className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Lakshmi Devi</h4>
                                        <p className="text-terracotta-400 text-xs uppercase tracking-wider">Master Weaver</p>
                                    </div>
                                </div>
                                <Heart className="text-stone-600 group-hover:text-red-500 transition-colors" />
                            </div>
                            <p className="text-xl italic font-serif leading-relaxed text-stone-300 group-hover:text-white transition-colors">
                                "LoomLegacy gave me the dignity I deserve. Before, verified buyers were hard to find. Now, my Banarasi sarees travel to corners of India I have never seen."
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -10 }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-olive-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full border-2 border-stone-700 p-1">
                                        <div className="w-full h-full rounded-full bg-stone-800 flex items-center justify-center font-bold text-lg text-white">AI</div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Ananya Iyer</h4>
                                        <p className="text-olive-400 text-xs uppercase tracking-wider">Verified Buyer</p>
                                    </div>
                                </div>
                                <Star className="text-stone-600 group-hover:text-yellow-400 transition-colors" />
                            </div>
                            <p className="text-xl italic font-serif leading-relaxed text-stone-300 group-hover:text-white transition-colors">
                                "The quality of the silk shawl I purchased is unmatched. Knowing that my money goes to the artisan makes the warmth of the fabric feel even better."
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
