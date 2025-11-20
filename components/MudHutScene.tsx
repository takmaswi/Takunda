'use client';

import { useRef, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  PerspectiveCamera,
  ContactShadows,
  OrbitControls,
  useTexture,
  Billboard
} from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from '@/components/ScrollContext';

// Preload assets immediately when module loads (before component renders)
useGLTF.preload('/models/mud_hut.glb');

// Mud Hut Model Component
function MudHut({ rotation }: { rotation: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Use drei's useGLTF which handles GLTF extensions automatically
  const { scene } = useGLTF('/models/mud_hut.glb');

  useEffect(() => {
    if (!scene) return;

    // Get bounding box
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    // Process meshes - keep and enhance original materials from the GLB file
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        // Ensure geometry has necessary attributes
        if (!mesh.geometry.attributes.normal) {
          mesh.geometry.computeVertexNormals();
        }

        // Enable shadows
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Preserve natural material colors and optimize for directional lighting
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.envMapIntensity = 0.15;
              mat.metalness = 0.0; // Not metallic - mud is matte
              mat.roughness = 0.6; // Rough surface catches directional light well
              mat.needsUpdate = true;
            }
          });
        }
      }
    });

    // Center the model at origin
    scene.position.set(-center.x, -center.y, -center.z);
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = rotation;
      const currentRotation = groupRef.current.rotation.y;
      let diff = targetRotation - currentRotation;

      if (Math.abs(diff) > Math.PI) {
        diff = diff > 0 ? diff - Math.PI * 2 : diff + Math.PI * 2;
      }

      groupRef.current.rotation.y = currentRotation + diff * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, -3.5, 0]}> {/* Extremely lowered hut */}
      {/* Scale the model - original size is ~42 units tall */}
      <primitive object={scene} scale={0.2} />
    </group>
  );
}

// Directional Golden Sunlight Component
function GoldenSunlight() {
  return (
    <>
      {/* Very low ambient - keeps base hut dark brown */}
      <ambientLight intensity={0.08} color="#FFFFFF" />

      {/* Directional golden sunlight from top right - only lights surfaces facing it */}
      <directionalLight
        position={[12, 18, 8]} // Top right position
        intensity={1.2}
        color="#FFB84D" // Warm golden-orange
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
    </>
  );
}

// Fire Shader Code
const fireVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fireFragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Adjust UVs for movement
  float time = uTime * 1.5;
  
  // Create base noise layers
  float n1 = snoise(vec2(uv.x * 5.0, uv.y * 2.0 - time));
  float n2 = snoise(vec2(uv.x * 10.0, uv.y * 4.0 - time * 2.0));
  
  // Combine noise
  float noise = n1 * 0.5 + n2 * 0.25;
  
  // Shape the fire (taper at top, round at bottom)
  float bottom = smoothstep(0.0, 0.2, uv.y);
  float top = 1.0 - smoothstep(0.4, 1.0, uv.y); // Fade out earlier
  float sides = smoothstep(0.0, 0.4, uv.x) * smoothstep(1.0, 0.6, uv.x);
  
  // Main flame shape
  float flame = (noise + 0.5) * sides * top * bottom;
  
  // Color ramp
  vec3 color1 = vec3(1.0, 0.1, 0.0); // Red
  vec3 color2 = vec3(1.0, 0.6, 0.0); // Orange
  vec3 color3 = vec3(1.0, 0.9, 0.1); // Yellow
  
  vec3 finalColor = mix(color1, color2, flame * 2.0);
  finalColor = mix(finalColor, color3, smoothstep(0.4, 0.8, flame));
  
  // Alpha mask
  float alpha = smoothstep(0.2, 0.4, flame);
  
  gl_FragColor = vec4(finalColor, alpha * 0.9);
}
`;

function FireEffect({
  position,
  lightIntensity = 3.0
}: {
  position: [number, number, number];
  lightIntensity?: number;
  color?: string; // Kept for compatibility
  texturePath?: string; // Kept for compatibility
  particleCount?: number; // Kept for compatibility
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    // Flicker light
    if (lightRef.current) {
      const flicker = Math.sin(state.clock.elapsedTime * 10) * 0.3 +
        Math.cos(state.clock.elapsedTime * 23) * 0.2;
      lightRef.current.intensity = lightIntensity + flicker;
    }
  });

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#FF4500') }
  }), []);

  return (
    <group position={position}>
      <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
        <mesh position={[0, 0.8, 0]}> {/* Lifted slightly so base is at 0 */}
          <planeGeometry args={[1.2, 2.0]} /> {/* Smaller, taller aspect ratio */}
          <shaderMaterial
            ref={materialRef}
            vertexShader={fireVertexShader}
            fragmentShader={fireFragmentShader}
            uniforms={uniforms}
            transparent={true}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
      <pointLight
        ref={lightRef}
        color="#FF5500"
        intensity={lightIntensity}
        distance={10}
        decay={2}
      />
    </group>
  );
}

// Loading Fallback - Skeleton hut shape
function Loader() {
  const loaderRef = useRef<THREE.Group>(null);

  // Gentle pulse animation
  useFrame((state) => {
    if (loaderRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 0.9;
      loaderRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={loaderRef}>
      {/* Simple hut-like wireframe placeholder */}
      <mesh position={[0, 0.5, 0]}>
        <coneGeometry args={[1.2, 1.5, 6]} />
        <meshStandardMaterial
          color="#D4AF37"
          wireframe
          emissive="#D4AF37"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[1, 1, 0.8, 6]} />
        <meshStandardMaterial
          color="#D4AF37"
          wireframe
          emissive="#D4AF37"
          emissiveIntensity={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 3, 0]} intensity={1} color="#D4AF37" />
    </group>
  );
}

// Main Scene Component
export default function MudHutScene() {
  const { scrollProgress } = useScroll();

  // Calculate rotation based on scroll (0 to 360 degrees)
  // Smooth out the rotation curve for better visual experience
  const rotation = scrollProgress * Math.PI * 2;

  return (
    <div className="w-full h-screen fixed top-0 left-0 z-0 pointer-events-none">
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.7,
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Camera positioned FRONTALLY for symmetry */}
        <PerspectiveCamera
          makeDefault
          position={[0, 1, 11]}
          fov={45}
          near={0.1}
          far={1000}
        />

        <OrbitControls
          target={[0, 1, 0]}
          enableZoom={false}
          enablePan={false}
          enableRotate={false} // Lock rotation to preserve the curated view
        />

        {/* Dark background matching theme */}
        <color attach="background" args={['#0F0F0F']} />

        <Suspense fallback={<Loader />}>
          <MudHut rotation={rotation} />
          <GoldenSunlight />

          {/* Realistic Fire - Left Flank (Symmetrical & Visible) */}
          <FireEffect
            position={[-3.5, -3.5, 0]} // Brought in for safety
            lightIntensity={6.0}
          />

          {/* Realistic Fire - Right Flank (Symmetrical & Visible) */}
          <FireEffect
            position={[3.5, -3.5, 0]} // Brought in for safety
            lightIntensity={6.0}
          />

          {/* Enhanced Contact Shadows for realistic ground shadow */}
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.5}
            scale={12}
            blur={2.5}
            far={5}
            resolution={512}
            color="#000000"
          />
        </Suspense>

        {/* Fog to contain light and prevent bleeding into content areas */}
        <fog attach="fog" args={['#0F0F0F', 12, 32]} />
      </Canvas>
    </div>
  );
}
