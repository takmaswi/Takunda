'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ScrollProvider } from '@/components/ScrollContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollProgress from '@/components/ScrollProgress';
import FoundationSection from '@/components/sections/FoundationSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ContactSection from '@/components/sections/ContactSection';

// Dynamic import for 3D scene to avoid SSR issues
const MudHutScene = dynamic(() => import('@/components/MudHutScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-dark-bg">
      <div className="text-center">
        <div className="loading-shimmer w-32 h-32 rounded-lg mx-auto mb-4" />
        <p className="text-gray-400 text-sm">Loading 3D Experience...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <ScrollProvider>
        <main className="relative bg-dark-bg">
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
                <div className="pt-12 animate-float">
                  <div className="text-sm text-gray-500 mb-2">Scroll to Explore</div>
                  <svg
                    className="w-6 h-6 mx-auto text-accent-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ transform: 'rotate(-90deg)' }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>
            </section>

            {/* Foundation Section - 0° (Front) */}
            <section className="min-w-full h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <FoundationSection />
            </section>

            {/* Portfolio Section - 90° */}
            <section className="min-w-full h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-12 snap-start">
              <PortfolioSection />
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
    </>
  );
}
