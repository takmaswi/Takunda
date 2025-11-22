'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';
import { ScrollProvider } from '@/components/ScrollContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

import Navbar from '@/components/Navbar';
import FoundationSection from '@/components/sections/FoundationSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import PortfolioSection2 from '@/components/sections/PortfolioSection2';
import PortfolioSection3 from '@/components/sections/PortfolioSection3';
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
  // Only use horizontal scroll on desktop (md and up)
  // We can't easily conditionally call hooks, so we'll handle the logic inside the hook or just pass a ref that is ignored on mobile
  // But for now, let's just use the hook and rely on CSS to disable the horizontal overflow on mobile
  const scrollRef = useHorizontalScroll();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <ScrollProvider>
        <Navbar />
        <main className="relative bg-dark-bg" style={{ background: '#0F0F0F' }}>
          {/* 3D Scene - Fixed Background */}
          <ErrorBoundary>
            <MudHutScene />
          </ErrorBoundary>



          {/* Scroll Container - Horizontal on Desktop, Vertical on Mobile */}
          <div
            id="scroll-container"
            ref={scrollRef}
            className="relative z-10 flex flex-col md:flex-row h-screen md:overflow-x-auto md:overflow-y-hidden overflow-y-auto overflow-x-hidden"
          >
            {/* Hero Section */}
            <section className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex flex-col items-center justify-center px-6 snap-start">
              <div className="relative z-10 flex flex-col items-center">
                {/* Vertical Line Decoration - Top */}
                <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-accent-cyan/50 mb-8"></div>

                {/* Glassmorphic Text Container */}
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 px-6 py-8 md:px-12 md:py-12 rounded-sm relative overflow-hidden group">
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  <div className="text-center space-y-6 relative z-10">
                    <h1 className="text-4xl md:text-8xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 tracking-widest drop-shadow-lg">
                      TAKUNDA
                    </h1>
                    <div className="w-12 h-px bg-accent-cyan mx-auto"></div>
                    <p className="text-lg md:text-xl font-inter text-gray-300 font-light tracking-[0.3em] uppercase">
                      Digital Artisan
                    </p>
                  </div>
                </div>

                {/* Vertical Line Decoration - Bottom */}
                <div className="w-px h-16 md:h-24 bg-gradient-to-b from-accent-cyan/50 to-transparent mt-8"></div>

                <div className="mt-8">
                  <p className="text-xs font-inter text-accent-cyan/70 uppercase tracking-[0.4em] animate-pulse">
                    Explore
                  </p>
                </div>
              </div>
            </section>

            {/* Foundation Section - 0° (Front) */}
            <section className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <FoundationSection />
            </section>

            {/* Portfolio Section Part 1 - 90° */}
            <section className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center px-4 md:px-8 lg:px-12 snap-start">
              <PortfolioSection />
            </section>

            {/* Portfolio Section Part 2 - 135° */}
            <section className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center px-4 md:px-8 lg:px-12 snap-start">
              <PortfolioSection2 />
            </section>

            {/* Portfolio Section Part 3 - 180° */}
            <section className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center px-4 md:px-8 lg:px-12 snap-start">
              <PortfolioSection3 />
            </section>

            {/* Services Section - 225° */}
            <section className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <ServicesSection />
            </section>

            {/* Contact Section - 270° */}
            <section className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <ContactSection />
            </section>

            {/* Footer */}
            <footer className="w-full md:min-w-full min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center border-t md:border-t-0 md:border-l border-white/10 snap-start">
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
