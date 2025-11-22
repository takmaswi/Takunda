'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntranceScreenProps {
  onComplete: () => void;
}

export default function EntranceScreen({ onComplete }: EntranceScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    // Phase 1: Initial setup (0-0.5s)
    const phase1Timer = setTimeout(() => setPhase(2), 400);

    // Phase 2: Ubuntu text appears (0.4-1.2s)
    const phase2Timer = setTimeout(() => setPhase(3), 800);

    // Phase 3: Progress bar (0.8-2.5s)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increments over ~1.5s
      });
    }, 30);

    const phase3Timer = setTimeout(() => setPhase(4), 2000);

    // Phase 4: Hut interaction (2.0-3.0s)
    const phase4Timer = setTimeout(() => setPhase(5), 3000);

    // Phase 5: Transition out (3.0-3.5s)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(phase4Timer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 5 ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Phase 1: Blurred hut silhouette with golden glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, filter: 'blur(40px)' }}
        animate={{
          opacity: phase >= 1 ? 0.3 : 0,
          filter: phase >= 4 ? 'blur(5px)' : 'blur(40px)',
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="relative w-96 h-96">
          {/* Hut silhouette */}
          <div className="absolute inset-0 bg-gradient-radial from-[#C8793C]/40 via-[#C8793C]/20 to-transparent rounded-full" />
          <svg
            viewBox="0 0 200 200"
            className="absolute inset-0 w-full h-full"
            style={{ filter: 'drop-shadow(0 0 40px rgba(200, 121, 60, 0.6))' }}
          >
            {/* Simple hut shape */}
            <path
              d="M100,50 L150,100 L150,150 L50,150 L50,100 Z"
              fill="#8B6F47"
              opacity="0.5"
            />
            <path
              d="M100,50 L170,110 L30,110 Z"
              fill="#A0826D"
              opacity="0.4"
            />
          </svg>
        </div>
      </motion.div>

      {/* Phase 2: Ubuntu philosophy text */}
      <AnimatePresence>
        {phase >= 2 && phase < 4 && (
          <motion.div
            className="absolute flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-2xl md:text-3xl font-light text-[#B0B0B0] tracking-wide">
              I am because we are
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 3: Loading experience */}
      <AnimatePresence>
        {phase >= 3 && phase < 5 && (
          <motion.div
            className="absolute flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-[#B0B0B0] font-light">
              Preparing your Takunda experience...
            </p>

            {/* Progress bar container */}
            <div className="w-80 md:w-96">
              <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
                {/* Animated progress bar */}
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #C8793C 0%, #3DD9D9 100%)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>

              {/* Percentage counter */}
              <motion.div
                className="text-right mt-2 text-sm text-[#3DD9D9] font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {progress}%
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: Journey awaits */}
      <AnimatePresence>
        {phase >= 4 && phase < 5 && (
          <motion.div
            className="absolute bottom-32 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-xl text-[#B0B0B0] font-light">
              Your journey awaits
            </p>
            <motion.span
              className="text-2xl text-[#3DD9D9]"
              animate={{
                x: [0, 8, 0],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
