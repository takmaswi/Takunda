'use client';

import { portfolioData } from '@/lib/portfolioData';

export default function SkillsTimeline() {
  return (
    <div className="space-y-4">
      {/* Skills Section */}
      <div className="glass-card p-8 md:p-10">
        <h3 className="text-xl md:text-2xl font-bold text-gradient-gold mb-4 text-center">Technical Skills</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Languages */}
          <div>
            <h4 className="text-sm font-semibold text-accent-cyan mb-2 text-center">Languages</h4>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {portfolioData.skills.languages.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full text-xs text-accent-cyan"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Frontend */}
          <div>
            <h4 className="text-sm font-semibold text-accent-cyan mb-2 text-center">Frontend</h4>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {portfolioData.skills.frontend.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full text-xs text-accent-cyan"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div>
            <h4 className="text-sm font-semibold text-accent-cyan mb-2 text-center">Backend</h4>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {portfolioData.skills.backend.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full text-xs text-accent-cyan"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-sm font-semibold text-accent-cyan mb-2 text-center">Tools & Technologies</h4>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {portfolioData.skills.tools.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full text-xs text-accent-cyan"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-sm font-semibold text-accent-gold mb-2 text-center">Specialties</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {portfolioData.skills.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1.5 bg-accent-gold/10 border border-accent-gold/30 rounded-full text-xs text-accent-gold font-medium"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
