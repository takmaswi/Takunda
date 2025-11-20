'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';
import { portfolioData } from '@/lib/portfolioData';

export default function PortfolioSection2() {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'AI/ML', 'Data Visualization', 'Analytics', 'Automation', 'Developer Tool', 'Utility'];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScroll();

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');

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
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [currentSection, filter]);

  // Get projects 9-18 (AI, Data & Tech Group)
  const pageProjects = portfolioData.projects.slice(9, 18);

  // Filter only within this page's projects
  const filteredProjects = filter === 'All'
    ? pageProjects
    : pageProjects.filter(p => p.category === filter);

  return (
    <div
      ref={sectionRef}
      className="opacity-0 translate-y-10 w-full max-w-[95vw]"
    >
      <div className="w-full flex flex-col items-center">

        {/* Vertical Line Decoration */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-accent-cyan/50 mb-6 flex-shrink-0"></div>

        <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-center mb-4 text-white tracking-widest drop-shadow-md">
          PORTFOLIO II
        </h2>
        <div className="w-12 h-px bg-accent-cyan mx-auto mb-8"></div>

        <p className="text-center text-gray-300 text-xs mb-8 font-inter tracking-wide">
          More projects showcasing diverse expertise
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-1.5 rounded-sm text-xs font-medium transition-all duration-300 font-inter tracking-wide border ${filter === category
                ? 'bg-accent-cyan/20 border-accent-cyan text-white'
                : 'bg-black/40 border-white/10 hover:border-accent-cyan/50 text-gray-400 hover:text-white'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - No scrolling */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="project-card glass-card glass-card-hover p-5 opacity-0 translate-y-10 group border border-white/5 hover:border-accent-cyan/30 transition-all duration-500"
              >
                <div className={`h-1 w-full bg-gradient-to-r ${project.color} mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="mb-3">
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-accent-cyan/10 text-accent-cyan rounded-sm font-inter">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-base font-cinzel font-bold mb-2 text-white group-hover:text-accent-cyan transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed text-xs font-light font-inter">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] text-gray-300 font-inter tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-sm text-[10px] text-gray-300 font-inter tracking-wide">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
