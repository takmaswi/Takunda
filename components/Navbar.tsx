'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll } from '@/components/ScrollContext';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: 'Hero', index: 0 },
    { name: 'Foundation', index: 1 },
    { name: 'Portfolio I', index: 2 },
    { name: 'Portfolio II', index: 3 },
    { name: 'Portfolio III', index: 4 },
    { name: 'Services', index: 5 },
    { name: 'Contact', index: 6 },
];

export default function Navbar() {
    const { currentSection, scrollToSection } = useScroll();
    const [isOpen, setIsOpen] = useState(false);

    // Close mobile menu when section changes
    useEffect(() => {
        setIsOpen(false);
    }, [currentSection]);

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="fixed top-6 right-6 z-[60] md:hidden">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 bg-dark-bg/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <div className="flex flex-col space-y-6 text-center">
                            {navItems.map((item) => {
                                const isActive = currentSection === item.index;
                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => scrollToSection(item.index)}
                                        className={`text-2xl font-cinzel font-bold tracking-widest transition-colors ${isActive ? 'text-accent-gold' : 'text-gray-400 hover:text-white'
                                            }`}
                                    >
                                        {item.name}
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="fixed top-8 left-0 w-full z-50 hidden md:flex justify-center pointer-events-none"
            >
                <div className="relative flex items-center pointer-events-auto">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 -z-10" />

                    <div className="flex space-x-8 px-8 py-4 bg-black/20 backdrop-blur-md rounded-full border border-white/5 shadow-lg">
                        {navItems.map((item) => {
                            const isActive = currentSection === item.index;

                            return (
                                <div key={item.name} className="relative flex flex-col items-center group">
                                    <button
                                        onClick={() => scrollToSection(item.index)}
                                        className="relative w-4 h-4 flex items-center justify-center focus:outline-none"
                                        aria-label={`Scroll to ${item.name}`}
                                    >
                                        {/* Inactive Dot */}
                                        <div
                                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'opacity-0' : 'bg-gray-500 group-hover:bg-gray-300'
                                                }`}
                                        />

                                        {/* Active Sun - Layout Animation */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeSun"
                                                className="absolute inset-0 w-6 h-6 -m-1 flex items-center justify-center"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            >
                                                {/* Core Sun */}
                                                <motion.div
                                                    className="w-3 h-3 rounded-full bg-accent-gold shadow-[0_0_10px_rgba(255,215,0,0.8)]"
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                />

                                                {/* Sun Rays / Glow Ring */}
                                                <motion.div
                                                    className="absolute inset-0 border border-accent-gold/40 rounded-full"
                                                    animate={{ scale: [1, 1.4], opacity: [0.8, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                                                />

                                                {/* Outer Rotating Rays (Decorative) */}
                                                <motion.div
                                                    className="absolute w-full h-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                >
                                                    {[...Array(8)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className="absolute top-0 left-1/2 w-0.5 h-1 bg-accent-gold/30 -translate-x-1/2 origin-[50%_12px]"
                                                            style={{ transform: `translateX(-50%) rotate(${i * 45}deg) translateY(-2px)` }}
                                                        />
                                                    ))}
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </button>

                                    {/* Label */}
                                    <span
                                        className={`absolute top-8 text-[10px] font-cinzel font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${isActive
                                            ? 'text-accent-gold opacity-100 translate-y-0'
                                            : 'text-gray-500 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                                            }`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </motion.nav>
        </>
    );
}
