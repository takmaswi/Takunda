'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useScroll } from '@/components/ScrollContext';
import { portfolioData } from '@/lib/portfolioData';

export default function PortfolioSection2() {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Enterprise', '3D/WebGL', 'AI/ML', 'Mobile', 'SaaS', 'Education', 'Business'];
  const sectionRef = useRef<HTMLDivElement>(null);
  const { currentSection } = useScroll();

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.project-card');

    if (currentSection === 2) {
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
    } else {
      gsap.to(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: 'power2.in',
      });
    }
  }, [currentSection, filter]);

  const allProjects = filter === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === filter);

  // Show remaining projects from index 12 onwards
  const filteredProjects = allProjects.slice(12);

  return (
    <div
      ref={sectionRef}
      className="opacity-0 translate-y-10 w-full max-w-6xl"
    >
      <div className="w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gradient-gold">Portfolio - Part 2</h2>
        <p className="text-center text-gray-400 text-xs mb-4">
          More projects showcasing diverse expertise
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-accent-gold text-dark-bg'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid - No scrolling */}
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                className="project-card glass-card glass-card-hover p-4 opacity-0 translate-y-10 group"
              >
                <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${project.color} mb-3`} />

                <div className="mb-2">
                  <span className="text-xs px-2 py-0.5 bg-accent-gold/10 text-accent-gold rounded">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-base font-bold mb-2 group-hover:text-accent-gold transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-3 leading-relaxed text-xs">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-xs">
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
