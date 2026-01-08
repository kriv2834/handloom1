import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, PenTool } from 'lucide-react';

const OurStoryPage = () => {
    return (
        <div className="bg-stone-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center bg-stone-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574634534894-89d7501640a1?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                <div className="relative z-10 text-center max-w-4xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-display text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Threads of Harmony
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-xl md:text-2xl text-stone-200 font-serif italic"
                    >
                        Reviving the ancient rhythm of the handloom, one weave at a time.
                    </motion.p>
                </div>
            </div>

            {/* Mission Section (Woven Text Reveal) */}
            <section className="py-24 px-4 max-w-4xl mx-auto text-center relative">
                <div className="absolute top-20 left-20 w-32 h-32 bg-terracotta-100 rounded-full blur-[60px] opacity-40"></div>
                <div className="relative z-10">
                    <span className="text-terracotta-600 font-bold uppercase tracking-widest text-sm mb-4 block">Our Mission</span>
                    <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-800 mb-10 leading-tight">
                        Not just a marketplace.<br />A cultural reclamation.
                    </h2>
                    <div className="text-xl md:text-2xl text-stone-600 leading-relaxed font-serif space-y-8">
                        <motion.p initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                            "LoomLegacy was born from a silence. The silence of looms gathering dust."
                        </motion.p>
                        <motion.p initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
                            We set out to build a bridge. Connecting the discerning modern soul to the master artisan in Varanasi. No middlemen. Just pure art.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* [NEW] The Timeline: Past -> Decline -> Revival */}
            <section className="py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20"></div>
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <h3 className="font-display text-3xl font-bold mb-16 text-center">The Thread of Time</h3>

                    <div className="relative border-l-2 border-stone-700 ml-4 md:ml-1/2 md:-translate-x-px space-y-24">
                        {/* Past */}
                        <TimelineEvent
                            side="left"
                            year="The Golden Age"
                            title="When Muslin was Gold"
                            desc="Centuries ago, Indian textiles clothed the world. From Roman royalty to the sheer unmatched lightness of Dhaka muslin."
                        />
                        {/* Decline */}
                        <TimelineEvent
                            side="right"
                            year="The Silence"
                            title="The Industrial Roar"
                            desc="Machines replaced magic. Fast fashion drowned out the rhythmic clack of the shuttle. The artisan was forgotten."
                        />
                        {/* Revival */}
                        <TimelineEvent
                            side="left"
                            year="The Revival"
                            title="You. The New Patron."
                            desc="Today, we rewrite the story. With every weave you adopt, you don't just buy cloth. You sustain a lineage."
                            isLast
                        />
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl font-bold text-stone-800">Why We Exist</h2>
                        <div className="w-24 h-1 bg-terracotta-500 mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <ValueCard
                            icon={<Users size={32} />}
                            title="Empowerment"
                            desc="We return 78% of the profits from sales back to the weaving communities immediately."
                        />
                        <ValueCard
                            icon={<Globe size={32} />}
                            title="Heritage"
                            desc="Preserving centuries-old weaving techniques that define our cultural identity."
                        />
                        <ValueCard
                            icon={<PenTool size={32} />}
                            title="Craftsmanship"
                            desc="Celebrating the imperfections that mark the human touch, distinct from machines."
                        />
                        <ValueCard
                            icon={<Heart size={32} />}
                            title="Sustainability"
                            desc="Slow fashion that respects the environment, using natural fibers and dyes."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const TimelineEvent = ({ side, year, title, desc, isLast }) => {
    const isLeft = side === 'left';
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className={`relative pl-8 md:pl-0 flex flex-col md:flex-row items-center w-full ${isLeft ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Dot */}
            <div className={`absolute top-0 left-[-5px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-4 border-stone-900 ${isLast ? 'bg-lime-500 shadow-[0_0_20px_rgba(132,204,22,0.6)]' : 'bg-terracotta-500'}`}></div>

            {/* Spacer for alignment */}
            <div className="hidden md:block w-1/2"></div>

            {/* Content */}
            <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                <span className="text-terracotta-400 font-bold uppercase tracking-widest text-xs mb-2 block">{year}</span>
                <h4 className="font-display text-3xl font-bold text-white mb-3">{title}</h4>
                <p className="text-stone-400 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    )
}

const ValueCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -10 }}
        className="text-center p-8 bg-stone-50 rounded-2xl border border-stone-100/50 hover:border-terracotta-100 transition-colors"
    >
        <div className="w-16 h-16 bg-white text-terracotta-600 rounded-full shadow-sm flex items-center justify-center mx-auto mb-6">
            {icon}
        </div>
        <h3 className="font-bold text-xl text-stone-800 mb-3">{title}</h3>
        <p className="text-stone-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
);

export default OurStoryPage;
