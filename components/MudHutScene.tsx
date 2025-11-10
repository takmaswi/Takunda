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
import {
  calculateSunPosition,
  calculateSunColor,
  calculateSunIntensity,
  calculateFillLightIntensity,
  calculateExposure
} from '@/lib/lighting';

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

        // If the material is a MeshStandardMaterial or MeshPhysicalMaterial,
        // minimize environment map intensity to show natural material colors
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ((mat as any).isMeshStandardMaterial || (mat as any).isMeshPhysicalMaterial) {
                (mat as any).envMapIntensity = 0.1; // Minimal to preserve textures
                mat.needsUpdate = true;
              }
            });
          } else if ((mesh.material as any).isMeshStandardMaterial || (mesh.material as any).isMeshPhysicalMaterial) {
            (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 0.1; // Minimal to preserve textures
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

// Dynamic Scene Lighting Component
function DynamicSceneLighting({ scrollProgress }: { scrollProgress: number }) {
  const sunLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const sunMeshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();

  useFrame(() => {
    if (!sunLightRef.current || !fillLightRef.current) return;

    // Calculate sun properties based on scroll progress
    const sunPosition = calculateSunPosition(scrollProgress);
    const sunColor = calculateSunColor(scrollProgress);
    const sunIntensity = calculateSunIntensity(scrollProgress);
    const fillIntensity = calculateFillLightIntensity(sunIntensity);
    const exposure = calculateExposure(sunIntensity);

    // Update sun light position
    sunLightRef.current.position.copy(sunPosition);

    // Update sun light color
    sunLightRef.current.color.setHex(sunColor);

    // Update sun light intensity
    sunLightRef.current.intensity = sunIntensity;

    // Update fill light intensity to compensate
    fillLightRef.current.intensity = fillIntensity;

    // Update visual sun mesh if it exists
    if (sunMeshRef.current) {
      sunMeshRef.current.position.copy(sunPosition);
      const material = sunMeshRef.current.material as THREE.MeshStandardMaterial;
      material.color.setHex(sunColor);
      material.emissive.setHex(sunColor);
    }

    // Update renderer exposure for realistic day cycle
    gl.toneMappingExposure = exposure;
  });

  return (
    <>
      {/* HDRI Environment - Minimal intensity to preserve natural material colors */}
      <Environment
        files="/hdri/studio_small_08_4k.exr"
        background={false}
        environmentIntensity={0.05}
      />

      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.5} />

      {/* Dynamic Sun Light - main shadow-casting directional light */}
      <directionalLight
        ref={sunLightRef}
        position={[20, 18, 8]} // Initial position (will be updated by useFrame)
        intensity={1.8} // Initial intensity (will be updated by useFrame)
        color={0xff8800} // Initial sunrise color (will be updated by useFrame)
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={100}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Fill light from opposite side - soft blue sky light */}
      <directionalLight
        ref={fillLightRef}
        position={[-15, 12, -5]}
        intensity={0.8}
        color="#87CEEB"
      />

      {/* Visual Sun Sphere - optional glowing sphere in the sky */}
      <mesh ref={sunMeshRef} position={[20, 18, 8]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color={0xff8800}
          emissive={0xff6600}
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

// Loading Fallback
function Loader() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial
          color="#D4AF37"
          wireframe
          emissive="#D4AF37"
          emissiveIntensity={0.3}
        />
      </mesh>
      <ambientLight intensity={0.5} />
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
          toneMappingExposure: 0.6,
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
          <DynamicSceneLighting scrollProgress={scrollProgress} />

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

        {/* Subtle fog for depth matching dark theme */}
        <fog attach="fog" args={['#0F0F0F', 15, 40]} />
      </Canvas>
    </div>
  );
}

// Note: Model is loaded on-demand via useLoader
