'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
    // Wait for the container to be available
    const container = document.querySelector('#scroll-container');
    if (!container) {
      console.warn('Scroll container not found');
      return;
    }

    // Create scroll trigger for smooth rotation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Reduced for smoother tracking
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Determine current section based on progress with hysteresis
          // Hero: 0-0.2
          // Foundation (0°): 0.2-0.4
          // Portfolio (90°): 0.4-0.6
          // Services (180°): 0.6-0.8
          // Contact (270°): 0.8-1.0
          if (progress < 0.3) {
            setCurrentSection(0);
          } else if (progress < 0.5) {
            setCurrentSection(1);
          } else if (progress < 0.7) {
            setCurrentSection(2);
          } else {
            setCurrentSection(3);
          }
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollProgress, currentSection }}>
      {children}
    </ScrollContext.Provider>
  );
}
