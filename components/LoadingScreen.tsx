'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-dark-bg flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gradient-gold mb-8 animate-breathe">
          TAKUNDA
        </h1>

        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-accent-gold to-accent-cyan transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-gray-400 text-sm">Loading experience... {progress}%</p>
      </div>
    </div>
  );
}
