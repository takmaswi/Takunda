# CLAUDE CODE PROMPT - Dynamic Sun Lighting System (Horizontal Scroll)

## 🌞 ELEGANT SUN LIGHTING IMPLEMENTATION

**Add a dynamic day-cycle lighting system where a sun "travels" across the sky as users scroll horizontally, casting realistic shadows and light onto the mud hut.**

---

## 🎯 THE CONCEPT

As the user scrolls **left to right**, a directional light source (sun) **moves across an invisible arc in the sky**:

- **Left edge (0% scroll)**: Sun on left side, warm orange glow, long shadows
- **Middle (50% scroll)**: Sun overhead, bright white light, minimal shadows (noon effect)
- **Right edge (100% scroll)**: Sun on right side, warm golden glow, long shadows opposite direction
- **Color shift**: Light color transitions from warm orange → bright white → warm orange/red (sunrise→midday→sunset)
- **Intensity variation**: Peaks at midday, dims at edges (realistic day cycle)

---

## 🛠️ IMPLEMENTATION STRATEGY (Most Elegant)

### **Use a Dual-Light System:**

1. **Primary Sun Light** (Main directional light)
   - Casts shadows
   - Moves with scroll progress
   - Color shifts based on position
   - Intensity varies for realistic effect

2. **Secondary Fill Light** (Ambient directional light)
   - Opposes the sun
   - Softens harsh shadows
   - Creates sophisticated 3D lighting

3. **Optional: Visual Sun** (Sphere mesh in sky)
   - Glowing sphere that moves with light
   - Matches sun light position
   - Optional glow effect for visual feedback

---

## 📋 DETAILED REQUIREMENTS

### **Horizontal Scroll Trigger Setup:**

```
Assume horizontal scroll container exists with scroll distance:
- Start: Left edge (0% scroll progress)
- End: Right edge (100% scroll progress)
- Total scroll distance: document.body.scrollWidth - window.innerWidth
```

### **Sun Light Behavior:**

1. **Position Movement (along invisible arc)**
   - Starts at: `(20, 18, 8)` — Left side, high in sky
   - Travels to: `(0, 25, 8)` — Directly overhead (midday)
   - Ends at: `(-20, 18, 8)` — Right side, high in sky
   - Uses smooth easing (cubic-bezier preferred)

2. **Color Progression** (day cycle colors)
   - 0% scroll: `#FF8800` (warm orange sunrise)
   - 25% scroll: `#FFDD55` (bright morning)
   - 50% scroll: `#FFFFFF` (bright noon white)
   - 75% scroll: `#FFAA33` (warm afternoon)
   - 100% scroll: `#FF6633` (warm sunset)

3. **Intensity Curve** (based on scroll progress)
   - 0% scroll: `1.8` (morning glow)
   - 50% scroll: `2.5` (peak noon brightness)
   - 100% scroll: `1.8` (evening glow)
   - Use sine wave for smooth curve

4. **Shadow Settings**
   - `castShadow: true`
   - `shadowMapSize: 2048x2048` (high quality)
   - Shadows should be visible on hut and ground

---

## 💾 CODE STRUCTURE (What Claude Should Build)

### **File: `src/lib/lighting.ts`** (New utility file)

Create a reusable lighting system:

```typescript
export interface SunLightConfig {
  scrollProgress: number; // 0-1
}

export const calculateSunPosition = (progress: number) => {
  // Arc across sky (smooth parabolic curve)
  const x = Math.cos(progress * Math.PI) * 20;
  const y = 18 + Math.sin(progress * Math.PI) * 7;
  const z = 8;
  return { x, y, z };
};

export const calculateSunColor = (progress: number) => {
  // Smooth color shift through day cycle
  const colors = [
    0xFF8800, // 0% - sunrise orange
    0xFFDD55, // 25% - morning bright
    0xFFFFFF, // 50% - noon white
    0xFFAA33, // 75% - afternoon warm
    0xFF6633, // 100% - sunset orange
  ];
  // Interpolate between colors based on progress
  // (implement color lerp)
  return interpolateColor(colors, progress);
};

export const calculateSunIntensity = (progress: number) => {
  // Peak at midday (50%), dim at edges
  return 1.8 + Math.sin(progress * Math.PI) * 0.7;
};
```

### **File: `src/components/Scene.tsx` or Three.js Setup**

Integrate the lighting system:

```typescript
// In your Three.js scene initialization:

import { 
  calculateSunPosition, 
  calculateSunColor, 
  calculateSunIntensity 
} from '@/lib/lighting';

// Create directional light (sun)
const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

// Create fill light (secondary, opposite side)
const fillLight = new THREE.DirectionalLight(0x87CEEB, 0.8);
fillLight.position.set(-15, 12, -5);
scene.add(fillLight);

// Create GSAP animation tied to horizontal scroll
gsap.to({}, {
  scrollTrigger: {
    trigger: "body", // or your horizontal scroll container
    start: "left left",
    end: "right right",
    horizontal: true, // Enable horizontal scroll
    scrub: 1, // Smooth scrubbing
    onUpdate: (self) => {
      const progress = self.progress; // 0-1
      
      // Update sun position
      const sunPos = calculateSunPosition(progress);
      sunLight.position.set(sunPos.x, sunPos.y, sunPos.z);
      
      // Update sun color
      const sunColor = calculateSunColor(progress);
      sunLight.color.setHex(sunColor);
      
      // Update sun intensity
      const sunIntensity = calculateSunIntensity(progress);
      sunLight.intensity = sunIntensity;
      
      // Update fill light to compensate
      fillLight.intensity = 1.0 - (sunIntensity - 1.0) * 0.3;
    },
  },
  duration: 0.1, // Placeholder (GSAP will override with scroll)
});
```

---

## 🌞 OPTIONAL: VISUAL SUN IN SKY

Add a glowing sphere mesh that follows the sun light:

```typescript
// Create visual sun (optional but elegant)
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  color: 0xFF8800,
  emissive: 0xFF6600,
  emissiveIntensity: 1.5,
});
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sunMesh);

// Update sun mesh position & color with light
// In the onUpdate callback above, add:
sunMesh.position.copy(sunLight.position);
sunMesh.material.color.setHex(sunColor);
sunMesh.material.emissive.setHex(sunColor);
```

---

## 🎨 ADVANCED ELEGANCE (Optional)

### **Add Post-Processing for Realism:**

1. **Bloom effect** on sun (glow halo)
2. **Tone mapping** adjustment (ToneMapping = ACESFilmicToneMapping)
3. **Exposure control** (dim/brighten overall scene as sun moves)

```typescript
// Adjust exposure based on sun intensity
renderer.toneMappingExposure = 0.8 + (sunIntensity - 1.0) * 0.4;
```

---

## 📝 COMPLETE CLAUDE PROMPT (Copy This)

---

**Update the Three.js scene to implement an elegant dynamic sun lighting system:**

**The user's horizontal scroll now controls a sun that "travels across the sky" realistically:**
- As scroll goes left→right, sun moves in an arc overhead
- Sun color shifts from orange (sunrise) → white (noon) → orange (sunset)
- Sun intensity peaks at midday, dims at edges
- Shadows on hut update in real-time
- Secondary fill light prevents harsh shadow areas

**Implement this using:**
1. **A primary DirectionalLight** that casts shadows (moves with scroll)
2. **A secondary fill light** (opposite side, adjusts intensity)
3. **GSAP ScrollTrigger** tied to horizontal scroll progress (0-1)
4. **Smooth color/intensity interpolation** along the day-cycle curve
5. **Optional: Visual sun mesh** (glowing sphere that follows light)

**Color progression (day cycle):**
- 0%: #FF8800 (sunrise orange, intensity 1.8)
- 25%: #FFDD55 (morning bright, intensity 2.2)
- 50%: #FFFFFF (noon white, intensity 2.5)
- 75%: #FFAA33 (afternoon warm, intensity 2.2)
- 100%: #FF6633 (sunset orange, intensity 1.8)

**Position arc (smooth parabola):**
- 0%: (20, 18, 8) — left side
- 50%: (0, 25, 8) — overhead
- 100%: (-20, 18, 8) — right side

**Shadow settings:**
- castShadow: true
- shadowMapSize: 2048x2048
- shadowCamera.far: 100

**Create a utility file `src/lib/lighting.ts` with helper functions:**
- `calculateSunPosition(progress: 0-1)` → {x, y, z}
- `calculateSunColor(progress: 0-1)` → hex color
- `calculateSunIntensity(progress: 0-1)` → number

**Use these in the scene's onUpdate callback for smooth animation.**

**Result:** As users scroll horizontally, they'll see realistic day-cycle lighting with the sun arc above, colors shifting warmly, and shadows updating on the hut in real-time. Super elegant and sophisticated.

---

## ✅ SUCCESS CRITERIA

- ✓ Sun light moves smoothly in an arc with scroll (no jumps)
- ✓ Color transitions smoothly through day cycle
- ✓ Intensity peaks at middle, dims at edges
- ✓ Fill light prevents shadow crushing
- ✓ 60fps performance (smooth)
- ✓ Shadows visible on hut (photorealistic)
- ✓ Visual sun sphere optional but matches light position
- ✓ Professional, elegant, realistic result

---

**This creates the most sophisticated and elegant lighting system for horizontal scroll.** 🌞✨
