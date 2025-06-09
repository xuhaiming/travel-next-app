import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Destination, TravelerType } from '@/types/destination';
import { getDestinationsByTravelerType, getRandomDestination } from '@/data/destinations';

interface SpinningGlobeProps {
  travelerType: TravelerType;
  onDestinationSelected: (destination: Destination) => void;
}

const SpinningGlobe: React.FC<SpinningGlobeProps> = ({ travelerType, onDestinationSelected }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const globeRef = useRef<THREE.Mesh>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [isSpinning, setIsSpinning] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create globe geometry
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Load earth texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
    );
    
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 100,
    });

    const globe = new THREE.Mesh(geometry, material);
    globeRef.current = globe;
    scene.add(globe);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Stars background
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 10000;
    const starsPositions = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i++) {
      starsPositions[i] = (Math.random() - 0.5) * 2000;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (globeRef.current && isSpinning) {
        globeRef.current.rotation.y += 0.01;
        globeRef.current.rotation.x += 0.005;
      }

      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Auto-select destination after spinning
    const timer = setTimeout(() => {
      setIsSpinning(false);
      setShowText(true);
      
      // Select destination based on traveler type
      const availableDestinations = getDestinationsByTravelerType(travelerType);
      const selectedDestination = availableDestinations.length > 0 
        ? availableDestinations[Math.floor(Math.random() * availableDestinations.length)]
        : getRandomDestination();

      // Zoom to destination (simulate)
      if (globeRef.current && cameraRef.current) {
        const targetPosition = new THREE.Vector3(0, 0, 1.5);
        const currentPosition = cameraRef.current.position.clone();
        
        const animateZoom = () => {
          currentPosition.lerp(targetPosition, 0.05);
          cameraRef.current!.position.copy(currentPosition);
          
          if (currentPosition.distanceTo(targetPosition) > 0.01) {
            requestAnimationFrame(animateZoom);
          } else {
            setTimeout(() => onDestinationSelected(selectedDestination), 1000);
          }
        };
        
        animateZoom();
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [travelerType, onDestinationSelected, isSpinning]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black relative overflow-hidden">
      {/* 3D Globe Container */}
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center z-10">
          {/* Spinning indicator */}
          {isSpinning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full mx-auto mb-4"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Spinning the Globe...
              </h2>
              <p className="text-white/80 text-lg">
                Finding your perfect destination
              </p>
            </motion.div>
          )}

          {/* Destination found text */}
          {showText && !isSpinning && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Destination Found!
              </h2>
              <p className="text-white/80 text-xl">
                Preparing your adventure details...
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Ambient sound indicator */}
      <div className="absolute bottom-8 left-8 text-white/60 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>Ambient sounds playing</span>
        </div>
      </div>
    </div>
  );
};

export default SpinningGlobe;