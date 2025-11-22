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

    if (currentSection === 1) {
      gsap.to(sectionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }
  }, [currentSection]);

  return (
    <div
      ref={sectionRef}
      className="opacity-0 translate-y-10 w-full max-w-6xl"
    >
      {/* Main container */}
      <div className="w-full flex flex-col items-center">

        {/* Vertical Line Decoration */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent-cyan/50 mb-6 flex-shrink-0"></div>

        {/* Introduction Card */}
        <div className="glass-card p-5 md:p-10 mb-4 w-full relative overflow-hidden group">
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-center mb-4 text-white tracking-widest drop-shadow-md">
            FOUNDATION
          </h2>
          <div className="w-12 h-px bg-accent-cyan mx-auto mb-6"></div>

          <p className="text-sm font-inter text-accent-cyan text-center mb-1 uppercase tracking-widest">{portfolioData.personal.title}</p>
          <p className="text-xs text-gray-400 text-center mb-8">IT Consultant with {portfolioData.experience.years}+ years of professional experience</p>

          <div className="space-y-6 flex flex-col items-center">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed text-center font-light">
              {portfolioData.introduction.tagline.split('blend')[0]}blend{' '}
              <span className="text-white font-semibold border-b border-accent-cyan/30">creativity</span>{' '}
              with{' '}
              <span className="text-accent-cyan font-semibold">technology</span>.
            </p>

            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <p className="text-base text-gray-300 leading-relaxed text-center max-w-3xl mx-auto">
              {portfolioData.introduction.mainParagraph}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 text-center border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="text-2xl md:text-4xl font-cinzel font-bold text-white">{portfolioData.experience.years}+</div>
                <div className="text-xs md:text-sm text-accent-cyan mt-1 uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="p-4 text-center border border-white/5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="text-2xl md:text-4xl font-cinzel font-bold text-white">{portfolioData.experience.projectsCompleted}</div>
                <div className="text-xs md:text-sm text-accent-cyan mt-1 uppercase tracking-wider">Projects</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {portfolioData.techStack.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-black/40 border border-white/10 rounded-sm text-xs md:text-sm text-gray-300 hover:border-accent-cyan/50 hover:text-white transition-all duration-300 font-inter tracking-wide"
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


    </div>
  );
}
