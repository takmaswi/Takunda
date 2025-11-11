'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ScrollProvider } from '@/components/ScrollContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ScrollProgress from '@/components/ScrollProgress';
import FoundationSection from '@/components/sections/FoundationSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import PortfolioSection2 from '@/components/sections/PortfolioSection2';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';

// Dynamic import for 3D scene to avoid SSR issues
const MudHutScene = dynamic(() => import('@/components/MudHutScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen fixed top-0 left-0 z-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin" />
        <p className="text-sm text-gray-500 animate-pulse">Loading 3D Scene...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <ScrollProvider>
        <main className="relative bg-dark-bg" style={{ background: '#0F0F0F' }}>
          {/* 3D Scene - Fixed Background */}
          <ErrorBoundary>
            <MudHutScene />
          </ErrorBoundary>

          {/* Scroll Progress Indicator */}
          <ScrollProgress />

          {/* Scroll Container - Horizontal */}
          <div id="scroll-container" className="relative z-10 flex h-screen overflow-x-auto overflow-y-hidden">
            {/* Hero Section */}
            <section className="min-w-full h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 snap-start">
              <div className="text-center space-y-6 animate-breathe">
                <h1 className="text-7xl md:text-9xl font-bold text-gradient-gold tracking-tight">
                  TAKUNDA
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                  Crafting Digital Experiences Through Code & Creativity
                </p>
                <div className="pt-8">
                  <p className="text-sm text-accent-cyan animate-pulse">
                    → Scroll to explore →
                  </p>
                </div>
              </div>
            </section>

            {/* Foundation Section - 0° (Front) */}
            <section className="min-w-full h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <FoundationSection />
            </section>

            {/* Portfolio Section Part 1 - 90° */}
            <section className="min-w-full h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <PortfolioSection />
            </section>

            {/* Portfolio Section Part 2 - 135° */}
            <section className="min-w-full h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <PortfolioSection2 />
            </section>

            {/* Services Section - 180° */}
            <section className="min-w-full h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <ServicesSection />
            </section>

            {/* Contact Section - 270° */}
            <section className="min-w-full h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <ContactSection />
            </section>

            {/* Footer */}
            <footer className="min-w-full h-screen flex-shrink-0 flex items-center justify-center border-l border-white/10 snap-start">
              <div className="space-y-4 text-center">
                <p className="text-gray-400">
                  © 2025 TAKUNDA. All rights reserved.
                </p>
                <p className="text-sm text-gray-500">
                  Built with Next.js, Three.js & GSAP
                </p>
              </div>
            </footer>
          </div>
        </main>
      </ScrollProvider>
    </motion.div>
  );
}
