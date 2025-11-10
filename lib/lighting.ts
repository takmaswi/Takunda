/**
 * Dynamic Sun Lighting System
 * Controls sun position, color, and intensity based on horizontal scroll progress
 */

import * as THREE from 'three';

export interface SunLightConfig {
  scrollProgress: number; // 0-1
}

/**
 * Calculate sun position along an arc across the sky
 * Creates a smooth parabolic curve from left to right
 * @param progress - Scroll progress (0-1)
 * @returns {x, y, z} position vector
 */
export const calculateSunPosition = (progress: number): THREE.Vector3 => {
  // Arc across sky (smooth parabolic curve)
  // Left (0%) -> Overhead (50%) -> Right (100%)
  const x = Math.cos(progress * Math.PI) * 20;
  const y = 18 + Math.sin(progress * Math.PI) * 7;
  const z = 8;
  return new THREE.Vector3(x, y, z);
};

/**
 * Interpolate between an array of colors based on progress
 * @param colors - Array of color hex values
 * @param progress - Scroll progress (0-1)
 * @returns Interpolated color as hex number
 */
const interpolateColor = (colors: number[], progress: number): number => {
  if (progress <= 0) return colors[0];
  if (progress >= 1) return colors[colors.length - 1];

  // Find which two colors to interpolate between
  const scaledProgress = progress * (colors.length - 1);
  const index = Math.floor(scaledProgress);
  const t = scaledProgress - index;

  if (index >= colors.length - 1) {
    return colors[colors.length - 1];
  }

  const color1 = new THREE.Color(colors[index]);
  const color2 = new THREE.Color(colors[index + 1]);

  // Lerp between the two colors
  return color1.lerp(color2, t).getHex();
};

/**
 * Calculate sun color based on day cycle progression
 * Transitions from warm orange (sunrise) -> white (noon) -> warm orange/red (sunset)
 * @param progress - Scroll progress (0-1)
 * @returns Color as hex number
 */
export const calculateSunColor = (progress: number): number => {
  // Day cycle colors
  const colors = [
    0xff8800, // 0% - sunrise orange
    0xffdd55, // 25% - morning bright
    0xffffff, // 50% - noon white
    0xffaa33, // 75% - afternoon warm
    0xff6633, // 100% - sunset orange
  ];

  return interpolateColor(colors, progress);
};

/**
 * Calculate sun intensity based on time of day
 * Peaks at midday (50%), dims at edges (sunrise/sunset)
 * @param progress - Scroll progress (0-1)
 * @returns Intensity value
 */
export const calculateSunIntensity = (progress: number): number => {
  // Peak at midday (50%), dim at edges
  // Base intensity: 1.8, peak addition: 0.7 (max = 2.5 at noon)
  return 1.8 + Math.sin(progress * Math.PI) * 0.7;
};

/**
 * Calculate fill light intensity to complement sun
 * Inversely proportional to sun intensity to prevent overexposure
 * @param sunIntensity - Current sun intensity
 * @returns Fill light intensity
 */
export const calculateFillLightIntensity = (sunIntensity: number): number => {
  return 1.0 - (sunIntensity - 1.0) * 0.3;
};

/**
 * Calculate renderer exposure based on sun intensity
 * Adjusts overall scene brightness for realistic day cycle
 * @param sunIntensity - Current sun intensity
 * @returns Tone mapping exposure value
 */
export const calculateExposure = (sunIntensity: number): number => {
  return 0.8 + (sunIntensity - 1.0) * 0.4;
};
