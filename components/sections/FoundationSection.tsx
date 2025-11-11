'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';
import { portfolioData } from '@/lib/portfolioData';
import SkillsTimeline from '@/components/SkillsTimeline';

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
      className="opacity-0 translate-y-10 w-full max-w-6xl"
    >
      {/* Main scrollable container */}
      <div className="h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* Introduction Card */}
        <div className="glass-card p-6 md:p-8 mb-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gradient-gold">Foundation</h2>
          <p className="text-sm text-gray-400 text-center mb-1">{portfolioData.personal.title}</p>
          <p className="text-xs text-accent-cyan text-center mb-6">IT Consultant with {portfolioData.experience.years}+ years of professional experience</p>

          <div className="space-y-4">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
              {portfolioData.introduction.tagline.split('blend')[0]}blend{' '}
              <span className="text-accent-gold font-semibold">creativity</span>{' '}
              with{' '}
              <span className="text-accent-cyan font-semibold">technology</span>.
            </p>

            <div className="h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

            <p className="text-base text-gray-400 leading-relaxed">
              {portfolioData.introduction.mainParagraph}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="glass-card p-4 text-center hover:bg-white/5 transition-colors duration-300">
                <div className="text-2xl md:text-3xl font-bold text-gradient-gold">{portfolioData.experience.years}+</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Years Experience</div>
              </div>
              <div className="glass-card p-4 text-center hover:bg-white/5 transition-colors duration-300">
                <div className="text-2xl md:text-3xl font-bold text-gradient-cyan">{portfolioData.experience.projectsCompleted}</div>
                <div className="text-xs md:text-sm text-gray-400 mt-1">Projects</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {portfolioData.techStack.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white/5 border border-accent-gold/30 rounded-full text-xs md:text-sm hover:bg-accent-gold/10 hover:border-accent-gold/50 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Skills and Timeline */}
        <SkillsTimeline />
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
