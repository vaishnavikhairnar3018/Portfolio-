import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import './HeroScene.css';

interface HeroSceneProps {
  onLoaded?: () => void;
}

export function HeroScene({ onLoaded }: HeroSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. Scene, Camera, Renderer ──
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f1e, 0.035);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 7.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── 2. Lights ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x22c55e, 3, 20);
    pointLight1.position.set(4, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2.5, 20);
    pointLight2.position.set(-4, -2, 2);
    scene.add(pointLight2);

    const amberLight = new THREE.PointLight(0xf59e0b, 1.8, 15);
    amberLight.position.set(2, -1, 4);
    scene.add(amberLight);

    // ── 3. Undulating Particle Meadow / Wave Grid ──
    const gridX = 75;
    const gridZ = 75;
    const particleCount = gridX * gridZ;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const initialY = new Float32Array(particleCount);

    const colorEmerald = new THREE.Color(0x22c55e);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorDark = new THREE.Color(0x0d2818);
    const tempColor = new THREE.Color();

    let pIdx = 0;
    for (let ix = 0; ix < gridX; ix++) {
      for (let iz = 0; iz < gridZ; iz++) {
        const x = (ix - gridX / 2) * 0.32;
        const z = (iz - gridZ / 2) * 0.32 - 1;
        const y = -2.2;

        particlePositions[pIdx * 3] = x;
        particlePositions[pIdx * 3 + 1] = y;
        particlePositions[pIdx * 3 + 2] = z;
        initialY[pIdx] = y;

        // Color gradient across the field
        const factor = (ix / gridX) * 0.6 + (iz / gridZ) * 0.4;
        tempColor.copy(colorEmerald).lerp(colorCyan, factor);
        if (iz > gridZ * 0.7) {
          tempColor.lerp(colorDark, 0.4);
        }

        particleColors[pIdx * 3] = tempColor.r;
        particleColors[pIdx * 3 + 1] = tempColor.g;
        particleColors[pIdx * 3 + 2] = tempColor.b;

        pIdx++;
      }
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(particleColors, 3)
    );

    // Circular particle texture using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleField);

    // ── 4. Floating 3D Geometric Centerpiece (Right-Side Focal Point) ──
    const heroGroup = new THREE.Group();
    // Offset toward the right side of the screen
    heroGroup.position.set(2.8, 0.4, 0);
    scene.add(heroGroup);

    // Core Icosahedron with glass/wireframe duality
    const coreGeometry = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x132338,
      emissive: 0x052e16,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    heroGroup.add(coreMesh);

    // Wireframe cage around the core
    const wireframeGeo = new THREE.IcosahedronGeometry(1.28, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    heroGroup.add(wireframeMesh);

    // Orbital glowing torus rings
    const ringGeo1 = new THREE.TorusGeometry(1.8, 0.015, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    heroGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.1, 0.012, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x22c55e,
      transparent: true,
      opacity: 0.35,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    heroGroup.add(ring2);

    // Satellite orbiting polyhedra
    const satellites: { mesh: THREE.Mesh; orbitRadius: number; speed: number; angle: number; yOffset: number }[] = [];
    const satGeo1 = new THREE.OctahedronGeometry(0.25, 0);
    const satMat1 = new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x22c55e,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });

    const satGeo2 = new THREE.TetrahedronGeometry(0.2, 0);
    const satMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
    });

    const satGeo3 = new THREE.DodecahedronGeometry(0.22, 0);
    const satMat3 = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
    });

    const satConfigs = [
      { geo: satGeo1, mat: satMat1, radius: 2.2, speed: 0.8, yOffset: 0.3 },
      { geo: satGeo2, mat: satMat2, radius: 2.7, speed: -0.6, yOffset: -0.4 },
      { geo: satGeo3, mat: satMat3, radius: 1.9, speed: 1.1, yOffset: 0.6 },
    ];

    satConfigs.forEach((cfg, i) => {
      const mesh = new THREE.Mesh(cfg.geo, cfg.mat);
      heroGroup.add(mesh);
      satellites.push({
        mesh,
        orbitRadius: cfg.radius,
        speed: cfg.speed,
        angle: (i * Math.PI * 2) / 3,
        yOffset: cfg.yOffset,
      });
    });

    // ── 5. Drifting Ambient Stardust Particles ──
    const starCount = 180;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 16;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 8 + 0.5;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTexture,
      transparent: true,
      color: 0x6ee7b7,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ── 6. Mouse Interaction & Responsive Handling ──
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Responsive hero group position on smaller screens
    const updateLayout = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (width < 768) {
        // Center the 3D element and push it back slightly on mobile
        heroGroup.position.set(0, 0.8, -1);
        heroGroup.scale.set(0.72, 0.72, 0.72);
      } else if (width < 1100) {
        heroGroup.position.set(2.0, 0.3, 0);
        heroGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        heroGroup.position.set(2.8, 0.4, 0);
        heroGroup.scale.set(1, 1, 1);
      }
    };
    updateLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });
    resizeObserver.observe(container);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── 7. Animation Loop ──
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPlayingRef.current) {
        renderer.render(scene, camera);
        return;
      }

      const elapsed = clock.getElapsedTime();
      const speedFactor = prefersReducedMotion ? 0.2 : 1.0;

      // Smooth mouse damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Camera parallax
      camera.position.x = currentMouseX * 0.6;
      camera.position.y = 1.2 - currentMouseY * 0.4;
      camera.lookAt(0, 0.2, 0);

      // Rotate centerpiece & rings
      coreMesh.rotation.x = elapsed * 0.2 * speedFactor;
      coreMesh.rotation.y = elapsed * 0.3 * speedFactor;
      wireframeMesh.rotation.x = -elapsed * 0.15 * speedFactor;
      wireframeMesh.rotation.y = -elapsed * 0.25 * speedFactor;

      ring1.rotation.z = elapsed * 0.35 * speedFactor;
      ring2.rotation.z = -elapsed * 0.28 * speedFactor;

      // Gentle floating bob
      heroGroup.position.y = (container.clientWidth < 768 ? 0.8 : 0.4) + Math.sin(elapsed * 1.2) * 0.12;

      // Orbit satellites
      satellites.forEach((sat) => {
        const angle = sat.angle + elapsed * sat.speed * speedFactor;
        sat.mesh.position.x = Math.cos(angle) * sat.orbitRadius;
        sat.mesh.position.z = Math.sin(angle) * sat.orbitRadius;
        sat.mesh.position.y = sat.yOffset + Math.sin(angle * 2) * 0.15;
        sat.mesh.rotation.x += 0.02 * speedFactor;
        sat.mesh.rotation.y += 0.03 * speedFactor;
      });

      // Animate wave meadow particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      let ptr = 0;
      for (let ix = 0; ix < gridX; ix++) {
        for (let iz = 0; iz < gridZ; iz++) {
          const u = ix / gridX;
          const v = iz / gridZ;
          const wave1 = Math.sin(u * 8 + elapsed * 1.5 * speedFactor) * 0.35;
          const wave2 = Math.cos(v * 6 + elapsed * 1.2 * speedFactor) * 0.3;
          const wave3 = Math.sin((u + v) * 4 + elapsed * 0.8 * speedFactor) * 0.2;

          // Mouse ripple influence
          const posX = positions[ptr * 3];
          const posZ = positions[ptr * 3 + 2];
          const distToMouse = Math.hypot(posX - currentMouseX * 3, posZ);
          const mouseLift = Math.max(0, 1 - distToMouse / 3) * 0.45;

          positions[ptr * 3 + 1] = initialY[ptr] + wave1 + wave2 + wave3 + mouseLift;
          ptr++;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Slow drift for stars
      starField.rotation.y = elapsed * 0.02 * speedFactor;

      renderer.render(scene, camera);
    };

    animate();
    if (onLoaded) onLoaded();

    // ── 8. Cleanup & Resource Disposal ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();

      // Dispose Three.js objects to prevent GPU memory leaks
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo1.dispose();
      satMat1.dispose();
      satGeo2.dispose();
      satMat2.dispose();
      satGeo3.dispose();
      satMat3.dispose();
      starGeo.dispose();
      starMat.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  const toggleAnimation = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return (
    <div className="hero-scene-container" aria-hidden="true">
      <div ref={containerRef} className="hero-scene-canvas-wrapper" />
      <button
        type="button"
        className="hero-3d-toggle-btn"
        onClick={toggleAnimation}
        aria-label={isPlaying ? 'Pause 3D animation' : 'Play 3D animation'}
      >
        <span className={`toggle-dot ${isPlaying ? 'toggle-dot--active' : ''}`} />
        <span>{isPlaying ? '3D Active' : '3D Paused'}</span>
      </button>
    </div>
  );
}
