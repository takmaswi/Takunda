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
    let handleScroll: ((ev?: Event) => void) | null = null;
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
      handleScroll = (_event?: Event) => {
        if (!container) return;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const progress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;

        setScrollProgress(progress);

        // Determine current section based on progress (now have 6 sections total)
        // Hero(0), Foundation(0), Portfolio1(1), Portfolio2(2), Services(3), Contact(4)
        if (progress < 0.2) {
          setCurrentSection(0);
        } else if (progress < 0.4) {
          setCurrentSection(1);
        } else if (progress < 0.55) {
          setCurrentSection(2);
        } else if (progress < 0.7) {
          setCurrentSection(3);
        } else {
          setCurrentSection(4);
        }
      };

      // Convert vertical scroll (wheel) to horizontal scroll
      handleWheel = (e: WheelEvent) => {
        if (!container) return;

        // Check if the target is within a vertical scrollable area
        const target = e.target as HTMLElement;
        const scrollableParent = target.closest('.custom-scrollbar, .scroll-container');

        if (scrollableParent) {
          // Allow natural vertical scrolling within scrollable sections
          const hasVerticalScroll = scrollableParent.scrollHeight > scrollableParent.clientHeight;
          const atTop = scrollableParent.scrollTop === 0;
          const atBottom = scrollableParent.scrollTop + scrollableParent.clientHeight >= scrollableParent.scrollHeight - 1;

          // Only hijack scroll if at top and scrolling up, or at bottom and scrolling down
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
            // Let the vertical scroll happen naturally
            return;
          }
        }

        // Prevent default vertical scrolling and convert to horizontal
        e.preventDefault();
        e.stopPropagation();

        // Use deltaY (vertical scroll) to scroll horizontally
        container.scrollLeft += e.deltaY;
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
