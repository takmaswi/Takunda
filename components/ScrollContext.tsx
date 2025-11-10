'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ScrollContextType {
  scrollProgress: number;
  currentSection: number;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollProgress: 0,
  currentSection: 0,
});

export const useScroll = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    let handleScroll: ((this: HTMLElement, ev: Event) => void) | null = null;
    let handleWheel: ((this: Document, ev: WheelEvent) => void) | null = null;
    let container: HTMLElement | null = null;

    // Wait a bit for the DOM to be fully ready
    const timer = setTimeout(() => {
      container = document.querySelector('#scroll-container') as HTMLElement;
      if (!container) {
        console.warn('Scroll container not found');
        return;
      }

      console.log('Container found:', container);
      console.log('Scroll width:', container.scrollWidth, 'Client width:', container.clientWidth);

      // Track horizontal scroll manually
      handleScroll = () => {
        if (!container) return;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const progress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;

        setScrollProgress(progress);

        // Determine current section based on progress with hysteresis
        if (progress < 0.3) {
          setCurrentSection(0);
        } else if (progress < 0.5) {
          setCurrentSection(1);
        } else if (progress < 0.7) {
          setCurrentSection(2);
        } else {
          setCurrentSection(3);
        }
      };

      // Convert vertical scroll (wheel) to horizontal scroll
      handleWheel = (e: WheelEvent) => {
        if (!container) return;
        console.log('Wheel event detected:', e.deltaY);

        // Prevent default vertical scrolling
        e.preventDefault();
        e.stopPropagation();

        // Use deltaY (vertical scroll) to scroll horizontally
        container.scrollLeft += e.deltaY;

        console.log('New scrollLeft:', container.scrollLeft);
      };

      // Listen to scroll events on the container
      container.addEventListener('scroll', handleScroll);

      // Listen to wheel events on the document to hijack vertical scrolling
      document.addEventListener('wheel', handleWheel, { passive: false });

      // Initial call to set progress
      handleScroll();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (container && handleScroll) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (handleWheel) {
        document.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollProgress, currentSection }}>
      {children}
    </ScrollContext.Provider>
  );
}
