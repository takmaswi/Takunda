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

    if (currentSection === 3) {
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
    } else {
      gsap.to(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [currentSection]);

  return (
    <div
      ref={sectionRef}
      className="opacity-0 translate-y-10 w-full max-w-6xl"
    >
      <div className="w-full h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gradient-gold">Services</h2>
        <p className="text-center text-gray-400 text-sm mb-6">Comprehensive solutions tailored to your needs</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolioData.services.map((service, index) => (
            <div
              key={index}
              className={`service-card glass-card glass-card-hover p-5 opacity-0 translate-y-10 group ${
                index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              <h3 className="text-lg font-bold mb-2 group-hover:text-gradient-gold transition-all duration-300">
                {service.title}
              </h3>

              <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                {service.description}
              </p>

              <ul className="space-y-1.5">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-xs text-gray-300"
                  >
                    <svg
                      className="w-3 h-3 mr-2 text-accent-gold flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(200, 121, 60, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(200, 121, 60, 0.7);
        }
      `}</style>
    </div>
  );
}
