'use client';

import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  Environment,
  PerspectiveCamera,
  ContactShadows,
  OrbitControls
} from '@react-three/drei';
import * as THREE from 'three';
import { useScroll } from '@/components/ScrollContext';

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
              if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                mat.envMapIntensity = 0.1; // Minimal to preserve textures
                mat.needsUpdate = true;
              }
            });
          } else if (mesh.material.isMeshStandardMaterial || mesh.material.isMeshPhysicalMaterial) {
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

// Scene Lighting Component
function SceneLighting() {
  return (
    <>
      {/* HDRI Environment - Minimal intensity to preserve natural material colors */}
      <Environment
        files="/hdri/studio_small_08_4k.exr"
        background={false}
        environmentIntensity={0.05}
      />

      {/* Ambient light for base illumination */}
      <ambientLight intensity={0.8} />

      {/* Key light - main shadow-casting light - warm tone */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.5}
        color="#FFF5E1"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light from opposite side - warm and soft */}
      <directionalLight
        position={[-5, 5, -3]}
        intensity={0.2}
        color="#FFF8DC"
      />

      {/* Accent light for warmth on the hut */}
      <pointLight
        position={[0, 3, 4]}
        intensity={0.3}
        color="#D4AF37"
        distance={12}
        decay={2}
      />
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
          <SceneLighting />

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
