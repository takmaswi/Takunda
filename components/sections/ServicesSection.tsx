'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';
import { portfolioData } from '@/lib/portfolioData';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScroll();

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.service-card');

    if (currentSection === 5) {
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [currentSection]);

  return (
    <div
      ref={sectionRef}
      className="opacity-0 translate-y-10 w-full max-w-6xl"
    >
      <div className="w-full flex flex-col items-center">

        {/* Vertical Line Decoration */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent-cyan/50 mb-6 flex-shrink-0"></div>

        <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-center mb-4 text-white tracking-widest drop-shadow-md">
          SERVICES
        </h2>
        <div className="w-12 h-px bg-accent-cyan mx-auto mb-8"></div>

        <p className="text-center text-gray-300 text-sm mb-10 font-inter tracking-wide max-w-2xl">
          Comprehensive solutions tailored to your digital needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {portfolioData.services.map((service, index) => (
            <div
              key={index}
              className={`service-card glass-card glass-card-hover p-8 opacity-0 translate-y-10 group border border-white/5 hover:border-accent-cyan/30 transition-all duration-500 ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
            >
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-500 text-accent-cyan">
                {service.icon}
              </div>

              <h3 className="text-lg font-cinzel font-bold mb-3 text-white group-hover:text-accent-cyan transition-colors duration-300 tracking-wide">
                {service.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed text-sm font-light">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-xs text-gray-300 font-inter tracking-wide"
                  >
                    <div className="w-1 h-1 bg-accent-cyan rounded-full mr-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}
