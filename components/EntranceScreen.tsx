'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface EntranceScreenProps {
  onComplete: () => void;
}

export default function EntranceScreen({ onComplete }: EntranceScreenProps) {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('Loading experience...');
  const [showHut, setShowHut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Phase 1: Show initial text and hut (0-0.3s)
    const hutTimer = setTimeout(() => setShowHut(true), 300);

    // Phase 2: Start progress animation (0.5s - 2.5s)
    const progressStart = setTimeout(() => {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1.25; // Smooth increment over ~2s
        });
      }, 25);
    }, 500);

    // Phase 3: Change text (1.5s)
    const textTimer = setTimeout(() => {
      setText('Preparing your journey...');
    }, 1500);

    // Phase 4: Fade out (3.0s)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Phase 5: Complete (4.0s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(hutTimer);
      clearTimeout(progressStart);
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: '#0F0F0F' }}
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Loading text - top area */}
      <motion.div
        className="absolute top-32 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.p
          className="text-lg text-[#B0B0B0] font-light tracking-wide"
          key={text}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {text}
        </motion.p>
      </motion.div>

      {/* Blurred hut silhouette - center */}
      <motion.div
        className="relative w-64 h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: showHut ? 0.6 : 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ filter: 'blur(10px)' }}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
        >
          {/* Simplified hut shape */}
          <path
            d="M100,50 L150,100 L150,150 L50,150 L50,100 Z"
            fill="#8B6F47"
            opacity="0.7"
          />
          <path
            d="M100,50 L170,110 L30,110 Z"
            fill="#A0826D"
            opacity="0.6"
          />
        </svg>
      </motion.div>

      {/* Progress line container - bottom area */}
      <motion.div
        className="absolute bottom-32 w-full max-w-2xl px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
      >
        {/* Progress line track */}
        <div className="relative h-1 bg-[#1A1A1A] rounded-full overflow-visible mb-4">
          {/* Animated golden→cyan line */}
          <motion.div
            className="absolute inset-y-0 left-0 h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #C8793C 0%, #3DD9D9 100%)',
              boxShadow: '0 0 20px rgba(200, 121, 60, 0.4)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />

          {/* Sun sphere moving along the line */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FFD700 0%, #C8793C 100%)',
              boxShadow: '0 0 15px rgba(255, 215, 0, 0.8), 0 0 30px rgba(255, 215, 0, 0.4)',
            }}
            initial={{ left: '0%' }}
            animate={{ left: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        </div>

        {/* Percentage counter */}
        <motion.div
          className="text-center text-sm text-[#3DD9D9] font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {Math.round(progress)}%
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
