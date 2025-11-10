'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';

export default function FoundationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScroll();

  useEffect(() => {
    if (!sectionRef.current) return;

    if (currentSection === 0) {
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
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
      className="opacity-0 translate-y-10"
    >
      <div className="glass-card glass-card-hover p-8 md:p-12 max-w-2xl">
        <h2 className="section-title">Foundation</h2>

        <div className="space-y-6">
          <p className="text-xl text-gray-300 leading-relaxed">
            Building digital experiences that blend{' '}
            <span className="text-accent-gold font-semibold">creativity</span>{' '}
            with{' '}
            <span className="text-accent-cyan font-semibold">technology</span>.
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

          <p className="text-lg text-gray-400 leading-relaxed">
            I'm a full-stack developer passionate about crafting immersive web
            experiences. With expertise in modern frameworks and a keen eye for
            design, I transform ideas into reality.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-bold text-gradient-gold">5+</div>
              <div className="text-sm text-gray-400 mt-1">Years Experience</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-3xl font-bold text-gradient-cyan">50+</div>
              <div className="text-sm text-gray-400 mt-1">Projects Completed</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {['React', 'Next.js', 'Three.js', 'TypeScript', 'Node.js', 'Tailwind'].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-accent-gold/30 rounded-full text-sm hover:bg-accent-gold/10 transition-colors duration-300"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
