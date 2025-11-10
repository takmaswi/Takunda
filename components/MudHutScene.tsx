'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  PerspectiveCamera,
  ContactShadows,
  OrbitControls
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
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ((mat as any).isMeshStandardMaterial || (mat as any).isMeshPhysicalMaterial) {
                (mat as any).envMapIntensity = 0.15;
                (mat as any).metalness = 0.0; // Not metallic - mud is matte
                (mat as any).roughness = 0.8; // Rough surface catches directional light well
                mat.needsUpdate = true;
              }
            });
          } else if ((mesh.material as any).isMeshStandardMaterial || (mesh.material as any).isMeshPhysicalMaterial) {
            (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 0.15;
            (mesh.material as THREE.MeshStandardMaterial).metalness = 0.0;
            (mesh.material as THREE.MeshStandardMaterial).roughness = 0.8;
            mesh.material.needsUpdate = true;
          }
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
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Scale the model - original size is ~42 units tall */}
      <primitive object={scene} scale={0.2} />
    </group>
  );
}

// Preload the model
useGLTF.preload('/models/mud_hut.glb');

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
        {/* Camera positioned at an angle to see the model */}
        <PerspectiveCamera
          makeDefault
          position={[8, 8, 8]}
          fov={45}
          near={0.1}
          far={1000}
        />

        <OrbitControls
          target={[0, 1, 0]}
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />

        {/* Dark background matching theme */}
        <color attach="background" args={['#0F0F0F']} />

        <Suspense fallback={<Loader />}>
          <MudHut rotation={rotation} />
          <GoldenSunlight />

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

// Note: Model is loaded on-demand via useLoader
