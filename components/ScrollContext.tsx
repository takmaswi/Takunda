'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface ScrollContextType {
  scrollProgress: number;
  currentSection: number;
  scrollToSection: (index: number) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollProgress: 0,
  currentSection: 0,
  scrollToSection: () => { },
});

export const useScroll = () => useContext(ScrollContext);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  const scrollToSection = useCallback((index: number) => {
    const container = document.querySelector('#scroll-container') as HTMLElement;
    if (container) {
      const sectionWidth = container.clientWidth;
      container.scrollTo({
        left: index * sectionWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  useEffect(() => {
    let handleScroll: ((ev?: Event) => void) | null = null;
    let handleKeyDown: ((ev: KeyboardEvent) => void) | null = null;
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
      console.log('Scroll height:', container.scrollHeight, 'Client height:', container.clientHeight);

      // Track scroll manually (supports both horizontal and vertical)
      handleScroll = (_event?: Event) => {
        if (!container) return;

        // Determine if we are in horizontal or vertical mode
        // We can check which dimension has scrollable content
        const isHorizontal = container.scrollWidth > container.clientWidth + 10;

        let progress = 0;

        if (isHorizontal) {
          const scrollLeft = container.scrollLeft;
          const scrollWidth = container.scrollWidth - container.clientWidth;
          progress = scrollWidth > 0 ? scrollLeft / scrollWidth : 0;
        } else {
          // Vertical mode (Mobile)
          const scrollTop = container.scrollTop;
          const scrollHeight = container.scrollHeight - container.clientHeight;
          progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        }

        setScrollProgress(progress);

        // Determine current section based on progress (now have 8 sections total)
        // Hero(0), Foundation(1), Portfolio1(2), Portfolio2(3), Portfolio3(4), Services(5), Contact(6), Footer(7)
        // Total scrollable width is divided into 7 segments (8 items)
        // Segment size = 1/7 ≈ 0.1428
        // Midpoints: 0.071, 0.214, 0.357, 0.500, 0.643, 0.786, 0.929
        if (progress < 0.071) {
          setCurrentSection(0);
        } else if (progress < 0.214) {
          setCurrentSection(1);
        } else if (progress < 0.357) {
          setCurrentSection(2);
        } else if (progress < 0.500) {
          setCurrentSection(3);
        } else if (progress < 0.643) {
          setCurrentSection(4);
        } else if (progress < 0.786) {
          setCurrentSection(5);
        } else if (progress < 0.929) {
          setCurrentSection(6);
        } else {
          setCurrentSection(7);
        }
      };

      // Handle keyboard navigation
      handleKeyDown = (e: KeyboardEvent) => {
        if (!container) return;

        // Check if user is typing in an input/textarea
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return;
        }

        const isHorizontal = container.scrollWidth > container.clientWidth + 10;
        const scrollAmount = isHorizontal ? container.clientWidth : container.clientHeight;

        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            // Scroll to next section
            e.preventDefault();
            if (isHorizontal) {
              container.scrollLeft += scrollAmount;
            } else {
              container.scrollTop += scrollAmount;
            }
            break;
          case 'ArrowLeft':
          case 'ArrowUp':
            // Scroll to previous section
            e.preventDefault();
            if (isHorizontal) {
              container.scrollLeft -= scrollAmount;
            } else {
              container.scrollTop -= scrollAmount;
            }
            break;
        }
      };

      // Listen to scroll events on the container
      container.addEventListener('scroll', handleScroll);

      // Listen to keyboard events for arrow key navigation
      document.addEventListener('keydown', handleKeyDown);

      // Initial call to set progress
      handleScroll();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (container && handleScroll) {
        container.removeEventListener('scroll', handleScroll);
      }
      if (handleKeyDown) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollProgress, currentSection, scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}
